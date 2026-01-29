import { useState } from 'react';
import { Search, Globe, Loader2 } from 'lucide-react';

interface SearchInputProps {
  onSearch: (target: string) => void;
  isLoading: boolean;
}

export const SearchInput = ({ onSearch, isLoading }: SearchInputProps) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const validateInput = (value: string): boolean => {
    // Domain regex
    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    // IPv4 regex
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    return domainRegex.test(value) || ipv4Regex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    
    if (!trimmed) {
      setError('Please enter a domain or IP address');
      return;
    }

    if (!validateInput(trimmed)) {
      setError('Invalid domain name or IP address');
      return;
    }

    setError('');
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Globe className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError('');
          }}
          placeholder="Enter domain or IP address (e.g., example.com or 8.8.8.8)"
          className="cyber-input w-full pl-12 pr-32 py-4 text-base"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="cyber-button absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 py-2.5"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Scanning
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Scan
            </>
          )}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </form>
  );
};
