import { Skeleton } from '@/components/ui/skeleton';

function Loading() {
  return (
    <>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <article key={i} className="activity-card">
            <Skeleton className="relative h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-[250px]" />
          </article>
        ))}
      </section>
    </>
  );
}
export default Loading;
