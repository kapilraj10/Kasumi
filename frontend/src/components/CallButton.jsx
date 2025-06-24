import React from 'react';
import { VideoIcon } from 'lucide-react';

const CallButton = ({ handleVideoCall }) => {
  return (
    <div className='absolute top-3 right-3 z-10'>
      <button onClick={handleVideoCall} className='bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg'>
        <VideoIcon className='w-5 h-5' />
      </button>
    </div>
  );
};

export default CallButton;
