import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';

import Comment from '@/components/forms/Comment';
import Card from '@/components/cards/Card';

import { fetchUser } from '@/lib/actions/user.actions';
import { fetchThreadById } from '@/lib/actions/thread.actions';
export const metadata: Metadata = {
  title: 'Buzz',
};
export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) redirect('/signin');

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const thread = await fetchThreadById(params.id);

  const reactionsData = await getReactionsData({
    userId: userInfo._id,
    posts: thread.children,
    parentId: thread._id,
  });

  const {
    parentReactions,
    parentReactionState,
    childrenReactions,
    childrenReactionState,
  } = reactionsData;

  return (
    <section className="relative">
      <div>
        <Card
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
          reactions={parentReactions.users}
          reactState={parentReactionState}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={params.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((childItem: any, idx: number) => (
          <Card
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            reactions={childrenReactions[idx].users}
            reactState={childrenReactionState[idx]}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default Page;
