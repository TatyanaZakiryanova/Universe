'use client';

import React from 'react';

interface PaginationProps {
  prevPageUrl: string | null;
  nextPageUrl: string | null;
  fetchData: (url: string) => void;
  loading: boolean;
}

const Pagination: React.FC<PaginationProps> = React.memo(
  ({ prevPageUrl, nextPageUrl, fetchData, loading }) => {
    const baseButtonClasses =
      'py-2 px-4 mr-1 text-white border-none rounded-lg transition-all duration-300';
    const enabledButtonClasses =
      'bg-customButton cursor-pointer hover:bg-customButtonHover hover:-translate-y-1';
    const disabledButtonClasses = 'bg-gray-300 cursor-not-allowed';

    return (
      <div className="flex justify-center mt-2.5">
        <button
          onClick={() => {
            if (prevPageUrl) {
              fetchData(prevPageUrl);
            }
          }}
          disabled={!prevPageUrl || loading}
          className={`${baseButtonClasses} ${
            loading || !prevPageUrl ? disabledButtonClasses : enabledButtonClasses
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (nextPageUrl) {
              fetchData(nextPageUrl);
            }
          }}
          disabled={!nextPageUrl || loading}
          className={`${baseButtonClasses} ${
            loading || !nextPageUrl ? disabledButtonClasses : enabledButtonClasses
          }`}
        >
          Next
        </button>
      </div>
    );
  },
);

export default Pagination;
