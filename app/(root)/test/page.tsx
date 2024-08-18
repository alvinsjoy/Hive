import { Skeleton } from '@/components/ui/skeleton';

function Loading() {
  return (
    <section className="relative">
      <div className="flex w-full flex-col justify-start">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="relative h-20 w-20 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-20 mt-3" />
            </div>
          </div>
        </div>
        <Skeleton className="mt-6 h-4 w-1/2" />
        <div className="mt-12 h-0.5 w-full bg-dark-3" />
      </div>

      <div className="mt-9">
        <div className="mt-2 flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      </div>

      <section className="mt-9 flex flex-col gap-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <article
            key={i}
            className="flex w-full flex-col rounded-xl bg-dark-2 p-7"
          >
            <div className="flex items-start justify-between">
              <div className="flex w-full flex-1 flex-row gap-4">
                <div className="flex flex-col items-center">
                  <Skeleton className="relative h-11 w-11 rounded-full" />
                  <div className="thread-card_bar" />
                </div>
                <div className="flex w-full flex-col space-y-3">
                  <Skeleton className="h-5 w-[100px] max-sm:w-[100px]" />
                  <Skeleton className="h-4 w-[350px] max-sm:w-[200px]" />
                  <Skeleton className="h-4 w-[250px] max-sm:w-[150px]" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}

export default Loading;
