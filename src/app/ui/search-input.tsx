'use client';

import React from 'react';
import Loader from './loader/loader';
import Button from './button';

interface SearchInputProps {
  searchValue: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  fetchData: () => void;
  loading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = React.memo(
  ({ searchValue, handleSearch, searchKey, fetchData, loading }) => {
    return (
      <>
        <div className="mb-5 flex flex-col justify-center md:flex-row">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search for photos..."
            onKeyUp={searchKey}
            className="mb-3 w-full rounded-lg border-none p-3 text-base text-black outline-none md:mb-0 md:mr-3 md:w-[400px]"
          />
          <Button onClick={fetchData} disabled={loading} className="px-5 py-2 md:w-auto">
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
        {loading && <Loader />}
      </>
    );
  },
);

SearchInput.displayName = 'SearchInput';
export default SearchInput;
