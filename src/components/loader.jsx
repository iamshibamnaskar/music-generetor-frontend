import React from 'react';

const LoaderComponent = () => {
  return (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-600 rounded-xl p-4 mb-5">
      <div className="flex gap-2 mb-3 justify-end">
        <div className="text-xs px-3 py-1 rounded-full bg-gray-300 text-white">
          &nbsp;
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-gray-300 text-white">
          &nbsp;
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm font-medium w-1/2 h-4 rounded-full bg-gray-400"></div>
              <div className="text-xs w-1/2 h-4 rounded-full bg-gray-400"></div>
            </div>
            <div className="bg-gray-400 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gray-400 h-full rounded-full transition-all duration-150"
                style={{ width: '50%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderComponent;
