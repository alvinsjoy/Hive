'use server';

import { revalidatePath } from 'next/cache';

import { connectToDB } from '../mongoose';

import User from '../models/user.model';
import Thread from '../models/thread.model';
import Community from '../models/community.model';
import { fetchUsers } from './user.actions';

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: 'author',
      model: User,
    })
    .populate({
      path: 'community',
      model: Community,
    })
    .populate({
      path: 'children',
      populate: {
        path: 'author',
        model: User,
        select: '_id name parentId image',
      },
    });

  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 },
    );

    const createdThread = await Thread.create({
      text,
      author,
      community: communityIdObject,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    if (communityIdObject) {
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { threads: createdThread._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create buzz: ${error.message}`);
  }
}
export async function editThread({
  threadId,
  text,
  path,
}: {
  threadId: string;
  text: string;
  path: string;
}) {
  try {
    connectToDB();

    const thread = await Thread.findById(threadId);

    if (!thread) {
      throw new Error('Buzz not found');
    }

    thread.text = text;

    await thread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to edit the buzz: ${error.message}`);
  }
}
export async function isThreadReactedByUser({
  threadId,
  userId,
}: {
  threadId: string;
  userId: string;
}) {
  try {
    connectToDB();

    const thread = await Thread.findOne({ _id: threadId });

    const isReacted: any = thread.reactions.some((reaction: any) =>
      reaction.user.equals(userId),
    );

    return !!isReacted;
  } catch (error: any) {
    throw new Error(
      `Failed to check if thread is reacted by user: ${error.message}`,
    );
  }
}
export async function getReactedUsersByThread(threadId: string) {
  try {
    connectToDB();

    const thread = await Thread.findOne({ _id: threadId });

    const reactedUsersIds = thread.reactions.map(
      (reaction: any) => reaction.user,
    );

    const reactedUsers = await fetchUsers({
      userId: 'INVALID_USER_ID',
      userIds: reactedUsersIds,
    });

    return reactedUsers;
  } catch (error: any) {
    throw new Error(`Failed to get reacted users: ${error.message}`);
  }
}
async function fetchAllChildThreads(threadId: string): Promise<any[]> {
  const childThreads = await Thread.find({ parentId: threadId });

  const descendantThreads = [];
  for (const childThread of childThreads) {
    const descendants = await fetchAllChildThreads(childThread._id);
    descendantThreads.push(childThread, ...descendants);
  }

  return descendantThreads;
}

export async function deleteThread(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    const mainThread = await Thread.findById(id).populate('author community');

    if (!mainThread) {
      throw new Error('Buzz not found');
    }

    const descendantThreads = await fetchAllChildThreads(id);
    const descendantThreadIds = [
      id,
      ...descendantThreads.map((thread) => thread._id),
    ];

    const uniqueAuthorIds = new Set(
      [
        ...descendantThreads.map((thread) => thread.author?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainThread.author?._id?.toString(),
      ].filter((id) => id !== undefined),
    );

    const uniqueCommunityIds = new Set(
      [
        ...descendantThreads.map((thread) => thread.community?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainThread.community?._id?.toString(),
      ].filter((id) => id !== undefined),
    );
    await Thread.deleteMany({ _id: { $in: descendantThreadIds } });

    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { threads: { $in: descendantThreadIds } } },
    );

    await Community.updateMany(
      { _id: { $in: Array.from(uniqueCommunityIds) } },
      { $pull: { threads: { $in: descendantThreadIds } } },
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete buzz: ${error.message}`);
  }
}

export async function fetchThreadById(threadId: string) {
  connectToDB();

  try {
    const thread = await Thread.findById(threadId)
      .populate({
        path: 'author',
        model: User,
        select: '_id id name image',
      })
      .populate({
        path: 'community',
        model: Community,
        select: '_id id name image',
      })
      .populate({
        path: 'children',
        populate: [
          {
            path: 'author',
            model: User,
            select: '_id id name parentId image',
          },
          {
            path: 'children',
            model: Thread,
            populate: {
              path: 'author',
              model: User,
              select: '_id id name parentId image',
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (err) {
    console.error('Error while fetching buzz:', err);
    throw new Error('Unable to fetch buzz');
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string,
) {
  connectToDB();

  try {
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error('Buzz not found');
    }
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    const savedCommentThread = await commentThread.save();
    originalThread.children.push(savedCommentThread._id);
    await originalThread.save();
    revalidatePath(path);
  } catch (err) {
    console.error('Error adding comment:', err);
    throw new Error('Unable to add comment to the buzz');
  }
}
export async function addReactToThread({
  threadId,
  userId,
  path,
}: {
  threadId: string;
  userId: string;
  path: string;
}) {
  try {
    connectToDB();

    const thread = await Thread.findById(threadId);
    const user = await User.findOne({ id: userId });

    if (!thread) {
      throw new Error('Buzz not found');
    }

    const isAlreadyReacted = await isThreadReactedByUser({
      threadId: thread._id,
      userId: user._id,
    });

    if (isAlreadyReacted) {
      thread.reactions.pull({
        user: user._id,
      });
    } else {
      thread.reactions.push({
        user: user._id,
      });
    }

    await thread.save();

    if (isAlreadyReacted) {
      user.reactions.pull({
        thread: thread._id,
      });
    } else {
      user.reactions.push({
        thread: thread._id,
      });
    }

    await user.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to add reaction to buzz: ${error.message}`);
  }
}
export async function fetchPostReactions({ threadId }: { threadId: string }) {
  try {
    connectToDB();

    const thread = await Thread.findOne({ id: threadId });

    if (!thread) {
      throw new Error('Thread not found');
    }

    const reactionsUsersIds = thread.reactions.map(
      (reaction: any) => reaction.user,
    );

    const reactions = await User.find({
      _id: { $in: reactionsUsersIds },
    }).select('_id id name image username');

    return reactions;
  } catch (error: any) {
    throw new Error(`Failed to fetch post reactions: ${error.message}`);
  }
}

export async function getReactionsData({
  userId,
  posts,
  parentId = '',
}: {
  userId: string;
  posts: any[];
  parentId?: string;
}) {
  try {
    connectToDB();

    const [parentReactions, parentReactionState, childrenData] =
      await Promise.all([
        (parentId && getReactedUsersByThread(parentId)) || [],
        (parentId &&
          isThreadReactedByUser({
            threadId: parentId,
            userId,
          })) ||
          false,
        Promise.all(
          posts.map(async (post) => {
            const reactedUsers = await getReactedUsersByThread(post._id);
            const reactedByUser = await isThreadReactedByUser({
              threadId: post._id,
              userId,
            });
            return { reactedUsers, reactedByUser };
          }),
        ),
      ]);

    const childrenReactions = childrenData.map(
      (data: any) => data.reactedUsers,
    );
    const childrenReactionState = childrenData.map(
      (data: any) => data.reactedByUser,
    );

    return {
      parentReactions,
      parentReactionState,
      childrenReactions,
      childrenReactionState,
    };
  } catch (error: any) {
    throw new Error(`Failed to get reactions data: ${error.message}`);
  }
}
