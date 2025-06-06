
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ValidationCheckmarkProps {
  show: boolean;
  delay?: number;
}

const ValidationCheckmark = ({ show, delay = 0 }: ValidationCheckmarkProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show, delay]);

  return (
    <div className={`validation-checkmark ${visible ? 'show' : ''} absolute right-3 top-1/2 transform -translate-y-1/2`}>
      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse-success">
        <Check className="h-4 w-4 text-white animate-checkmark" />
      </div>
    </div>
  );
};

export default ValidationCheckmark;
