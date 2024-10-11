'use client';

import React from 'react';
import Button from './button';

interface PaginationProps {
  prevPageUrl: string | null;
  nextPageUrl: string | null;
  fetchData: (url: string) => void;
  loading: boolean;
}

const Pagination: React.FC<PaginationProps> = React.memo(
  ({ prevPageUrl, nextPageUrl, fetchData, loading }) => {
    return (
      <div className="flex justify-center mt-2.5">
        <Button
          onClick={() => {
            if (prevPageUrl) {
              fetchData(prevPageUrl);
            }
          }}
          disabled={!prevPageUrl || loading}
          className="py-2 px-4 mr-1"
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            if (nextPageUrl) {
              fetchData(nextPageUrl);
            }
          }}
          disabled={!nextPageUrl || loading}
          className="py-2 px-4"
        >
          Next
        </Button>
      </div>
    );
  },
);

export default Pagination;
