import { Skeleton } from '@/components/ui/skeleton';
function Loading() {
  return (
    <>
      <h1 className="head-text">Communities</h1>
      <Skeleton className="mt-5 h-11 w-full" />
      <section className="mt-9 flex flex-wrap gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <article key={i} className="community-card">
            <div className="flex flex-1 flex-row gap-4">
              <div className="flex flex-col items-center">
                <Skeleton className="relative h-12 w-12 rounded-full" />
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            </div>
            <Skeleton className="mt-3 h-3 w-[250px]" />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <Skeleton className="h-7 w-14 rounded-md px-3" />
              <Skeleton className="h-7 w-7 rounded-full" />
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export default Loading;
