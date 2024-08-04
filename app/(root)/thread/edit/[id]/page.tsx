import Post from '@/components/forms/Post';
import { fetchThreadById } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) redirect('/signin');

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const thread = await fetchThreadById(params.id);

  return (
    <>
      <h1 className="head-text">Edit Buzz</h1>

      <Post
        userId={userInfo._id}
        threadId={thread.id}
        threadText={thread.text}
      />
    </>
  );
};

export default Page;
