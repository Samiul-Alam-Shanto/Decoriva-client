import React from "react";

const ServiceSkeleton = () => {
  return (
    <div className="h-full bg-base-100 rounded-4xl border border-base-content/5 overflow-hidden flex flex-col">
      <div className="relative h-64 bg-base-200 animate-pulse w-full"></div>

      <div className="p-6 flex flex-col grow">
        <div className="w-8 h-1 bg-base-200 mb-4 rounded-full animate-pulse"></div>

        <div className="h-8 bg-base-200 rounded-lg w-3/4 mb-4 animate-pulse"></div>
        <div className="space-y-2 mb-6 grow">
          <div className="h-4 bg-base-200 rounded-md w-full animate-pulse"></div>
          <div className="h-4 bg-base-200 rounded-md w-5/6 animate-pulse"></div>
        </div>
        <div className="border-t border-base-content/5 pt-4 flex items-center justify-between mt-auto">
          <div>
            <div className="h-3 bg-base-200 rounded w-20 mb-2 animate-pulse"></div>
            <div className="h-6 bg-base-200 rounded w-24 animate-pulse"></div>
          </div>

          <div className="h-10 w-28 bg-base-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSkeleton;
