
import { CheckCircle, Sparkles } from 'lucide-react';

interface SuccessAnimationProps {
  title: string;
  message: string;
}

const SuccessAnimation = ({ title, message }: SuccessAnimationProps) => {
  return (
    <div className="text-center py-8 animate-success-celebration">
      <div className="relative mb-6">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-pulse-success" />
        <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2 animate-sparkle" />
        <Sparkles className="h-4 w-4 text-yellow-400 absolute -bottom-1 -left-1 animate-sparkle" style={{ animationDelay: '0.3s' }} />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2 animate-slide-up">
        {title}
      </h2>
      
      <p className="text-gray-600 animate-slide-up-delay-1">
        {message}
      </p>
      
      <div className="mt-6 flex justify-center space-x-2 animate-slide-up-delay-2">
        <div className="w-2 h-2 bg-[#145587] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[#145587] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-[#145587] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default SuccessAnimation;
