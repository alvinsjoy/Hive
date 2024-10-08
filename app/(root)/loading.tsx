import { Skeleton } from '@/components/ui/skeleton';

function Loading() {
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {Array.from({ length: 5 }).map((_, i) => (
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
    </>
  );
}

export default Loading;
