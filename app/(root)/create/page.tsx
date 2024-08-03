import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import Post from '@/components/forms/Post';
import { fetchUser } from '@/lib/actions/user.actions';

async function Page() {
  const user = await currentUser();
  if (!user) redirect('/signin');

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  return (
    <>
      <h1 className="head-text">Create Buzz</h1>
      <Post userId={userInfo._id} />
    </>
  );
}

export default Page;
