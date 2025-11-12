import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps): React.JSX.Element {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-4">
      <input
        type="search"
        value={query}
        onChange={(e): void => setQuery(e.target.value)}
        placeholder="Search stocks by ticker symbol (e.g., AAPL)"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
    </form>
  );
}
