import styles from './SearchBar.module.css';

interface SearchBarProps {
  onChange: (value: string) => void;
}

export function SearchBar({ onChange }: SearchBarProps): React.ReactElement {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="search" className={styles.label}>
        Search for stocks
      </label>
      <input type="text" id="search" className={styles.input} onChange={handleChange} placeholder="Enter ticker symbol or company name" />
    </div>
  );
}
