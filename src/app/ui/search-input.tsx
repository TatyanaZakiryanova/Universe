'use client';

import Loader from './loader';

interface SearchInputProps {
  searchValue: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  fetchData: () => void;
  loading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchValue,
  handleSearch,
  searchKey,
  fetchData,
  loading,
}) => {
  return (
    <>
      <div className="flex justify-center my-5">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search for photos..."
          onKeyUp={searchKey}
          className="p-3 border-none rounded-lg mr-3 w-[400px] text-base outline-none text-black"
        />
        <button
          onClick={fetchData}
          className={`py-2 px-4 bg-customButton text-white border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-customButtonHover hover:-translate-y-1 ${
            loading ? 'bg-gray-300 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default SearchInput;
