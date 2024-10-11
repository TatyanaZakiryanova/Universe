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
        <div className="flex flex-col md:flex-row justify-center my-5">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search for photos..."
            onKeyUp={searchKey}
            className="p-3 border-none rounded-lg mb-3 md:mb-0 md:mr-3 w-[400px] text-base outline-none text-black"
          />
          <Button onClick={fetchData} disabled={loading} className="px-5 py-2">
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
        {loading && <Loader />}
      </>
    );
  },
);

export default SearchInput;
