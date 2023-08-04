// components/TogglePublicPrivate.ts
import React from 'react';
import { EyeOff,Globe2 } from 'lucide-react';

interface TogglePublicPrivateProps {
  isPublic: boolean;
  setPublic: (value: boolean) => void;
}

const TogglePublicPrivate: React.FC<TogglePublicPrivateProps> = ({ isPublic, setPublic }) => {
  const handleToggle = () => {
    setPublic(!isPublic);
  };


  return (
    <button onClick={handleToggle} className="p-2 mb-4 bg-neutral-200 rounded-full shadow-sm">
      {isPublic ? <Globe2  /> : <EyeOff />}
    </button>
  );
};

export default TogglePublicPrivate;
