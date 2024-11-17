import Image from 'next/image';

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dark-2">
      <Image src="/assets/logo.png" alt="Loading" width={80} height={80} />
      <Image src="/assets/loading.svg" alt="Loading" width={80} height={80} />
    </div>
  );
}

export default Loading;
