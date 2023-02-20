interface SkeletonProps {
  count?: number;
}
export const Skeleton = ({ count = 1 }: SkeletonProps) => {
  const amount = Array(count).fill(0);

  return (
    <div
      role="status"
      className="flex w-full animate-pulse flex-col items-center justify-center space-y-4 space-x-2 px-4 py-4"
    >
      {amount.map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="h-4 w-8/12 rounded-full bg-gray-200 dark:bg-gray-700"
        ></div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
