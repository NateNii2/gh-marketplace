const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white rounded-2xl overflow-hidden border">

      <div className="h-52 bg-gray-200" />

      <div className="p-4 space-y-3">

        <div className="h-4 bg-gray-200 rounded w-3/4" />

        <div className="h-4 bg-gray-200 rounded w-1/2" />

        <div className="h-10 bg-gray-200 rounded-xl" />

      </div>
    </div>
  );
};

export default SkeletonCard;