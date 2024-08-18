import { Skeleton } from '@/components/ui/skeleton';
function Loading() {
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <Skeleton className="mt-5 h-12 w-full" />

      <div className="mt-14 flex flex-col gap-9">
        {Array.from({ length: 5 }).map((_, i) => (
          <article key={i} className="user-card">
            <div className="user-card_avatar">
              <Skeleton className="relative h-12 w-12 rounded-full" />

              <div className="flex-1 flex-col space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-3 w-[50px]" />
              </div>
              <Skeleton className="h-8 w-[70px] rounded-lg px-3" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Loading;
