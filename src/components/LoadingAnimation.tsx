
import { Loader } from 'lucide-react';

interface LoadingAnimationProps {
  text?: string;
}

const LoadingAnimation = ({ text = "Chargement en cours" }: LoadingAnimationProps) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader className="h-5 w-5 animate-spin text-[#145587]" />
      <span className="text-sm font-medium">{text}</span>
      <div className="flex space-x-1">
        <div className="w-1 h-1 bg-[#145587] rounded-full loading-dot"></div>
        <div className="w-1 h-1 bg-[#145587] rounded-full loading-dot"></div>
        <div className="w-1 h-1 bg-[#145587] rounded-full loading-dot"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
