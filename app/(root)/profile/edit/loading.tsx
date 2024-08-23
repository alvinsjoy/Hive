import { Skeleton } from '@/components/ui/skeleton';

function Loading() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="mt-3 h-5 w-72" />

      <section className="mt-9 bg-dark-2 p-10">
        <div className="flex flex-col justify-start gap-10">
          <div className="flex items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-20" />
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="flex w-full flex-col gap-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="flex w-full flex-col gap-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-32 w-full" />
          </div>

          <Skeleton className="h-10 w-full" />
        </div>
      </section>
    </main>
  );
}

export default Loading;