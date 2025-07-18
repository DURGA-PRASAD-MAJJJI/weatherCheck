
const LoadingSkeleton = () => {
  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl animate-pulse">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="h-8 bg-white/20 rounded-lg w-48 mb-4"></div>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <div className="h-16 bg-white/20 rounded-lg w-24"></div>
            <div className="h-16 w-16 bg-white/20 rounded-lg"></div>
          </div>
          <div className="h-6 bg-white/20 rounded-lg w-32"></div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-4">
              <div className="h-6 w-6 bg-white/20 rounded-lg mx-auto mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-16 mx-auto mb-2"></div>
              <div className="h-6 bg-white/20 rounded w-12 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
