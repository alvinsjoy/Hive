import { Skeleton } from '@/components/ui/skeleton';

function Loading() {
  return (
    <section>
      <h1 className="head-text">Create Buzz</h1>

      <div className="mt-10 flex flex-col gap-10">
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-[300px] w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </section>
  );
}

export default Loading;
