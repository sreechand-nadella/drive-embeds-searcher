
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center w-full max-w-2xl mx-auto">
        <Input
          type="text"
          placeholder="Search your documents..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-12 border-2 border-border focus:border-primary/50 h-12 shadow-sm neo-morphism"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="absolute right-0 rounded-l-none h-12 px-3"
          variant="ghost"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spinner" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
