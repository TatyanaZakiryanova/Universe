import styles from '../styles/searchinput.module.scss';

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
    <div className={styles.searchField}>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search for photos..."
        onKeyUp={searchKey}
        className={styles.input}
      />
      <button onClick={fetchData} disabled={loading} className={styles.button}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchInput;
