'use client';

import styles from '../dashboard/search/styles/pagination.module.scss';

interface PaginationProps {
  prevPageUrl: string | null;
  nextPageUrl: string | null;
  fetchData: (url: string) => void;
  loading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  prevPageUrl,
  nextPageUrl,
  fetchData,
  loading,
}) => {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => {
          if (prevPageUrl) {
            fetchData(prevPageUrl);
          }
        }}
        disabled={!prevPageUrl || loading}
        className={styles.pageButton}
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
        className={styles.pageButton}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
