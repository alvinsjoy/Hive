import Image from 'next/image';
import Link from 'next/link';

import { formatDateString } from '@/lib/utils';
import DeleteThread from '../forms/DeleteThread';
import EditThread from '../forms/EditThread';
import Share from '../forms/Share';

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  reactions: {
    image: string;
    _id: string;
    id: string;
    name: string;
    username: string;
  }[];
  isComment?: boolean;
  reactState?: boolean;
}

function Card({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  reactions,
  isComment,
  reactState,
}: Props) {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  title="Like"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    title="Reply"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/repost.svg"
                    title="Repost"
                    alt="repost"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Share threadId={JSON.stringify(id)} />
              </div>

              <div className="flex flex-row gap-2">
                {isComment && (
                  <>
                    {comments.length > 0 && (
                      <Link href={`/thread/${id}`}>
                        <p className="mt-1 text-subtle-medium text-gray-1">
                          {comments.length}{' '}
                          {comments.length > 1 ? 'replies' : 'reply'}
                        </p>
                      </Link>
                    )}

                    {comments.length > 0 && reactions.length > 0 && (
                      <p className="mt-1 text-subtle-medium text-gray-1">•</p>
                    )}

                    {reactions.length > 0 && (
                      <Link href={`/thread/likes/${id}`}>
                        <p className="mt-1 text-subtle-medium text-gray-1">
                          {reactions.length}{' '}
                          {reactions.length > 1 ? 'likes' : 'like'}
                        </p>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <EditThread
            threadId={JSON.stringify(id)}
            currentUserId={currentUserId}
            authorId={author.id}
          />
          <DeleteThread
            threadId={JSON.stringify(id)}
            currentUserId={currentUserId}
            authorId={author.id}
            parentId={parentId}
            isComment={isComment}
          />
        </div>
      </div>

      {!isComment && (
        <div className="flex items-center mt-2">
          {comments.length > 0 && (
            <div className="ml-1 gap-2 flex items-center">
              {comments.slice(0, 2).map((comment, index) => (
                <Image
                  key={index}
                  src={comment.author.image}
                  alt={`user_${index}`}
                  width={24}
                  height={24}
                  className={`${
                    index !== 0 && '-ml-5'
                  } rounded-full object-cover`}
                />
              ))}

              <Link href={`/thread/${id}`}>
                <p className="ml-1 text-subtle-medium text-gray-1">
                  {comments.length} repl{comments.length > 1 ? 'ies' : 'y'}
                </p>
              </Link>
            </div>
          )}
          <Link
            href={community ? `/communities/${community.id}` : `/thread/${id}`}
            className="ml-auto flex items-center"
          >
            <p className="text-subtle-medium text-gray-1">
              {formatDateString(createdAt)}
              {community && ` - ${community.name}`}
            </p>
            {community && (
              <Image
                src={community.image}
                alt={community.name}
                width={14}
                height={14}
                className="ml-1 rounded-full object-cover"
              />
            )}
          </Link>
        </div>
      )}
    </article>
  );
}
export default Card;
