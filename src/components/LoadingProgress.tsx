
import { Loader } from 'lucide-react';

interface LoadingProgressProps {
  progress: number;
}

const LoadingProgress = ({ progress }: LoadingProgressProps) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Logo spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-white to-white/80 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress text */}
      <div className="text-white/80 text-sm font-medium">
        Chargement... {Math.round(progress)}%
      </div>

      {/* Loading dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-loading-dots"></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-loading-dots" style={{ animationDelay: '0.3s' }}></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-loading-dots" style={{ animationDelay: '0.6s' }}></div>
      </div>
    </div>
  );
};

export default LoadingProgress;
