
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { useToast } from "@/hooks/use-toast";
import { searchFiles } from "@/services/api";

interface SearchResult {
  id: string;
  title: string;
  driveLink: string;
  similarity: number; // 0-100
}

const Search = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("googleToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setCurrentQuery(query);
    
    try {
      const searchResults = await searchFiles(query);
      setResults(searchResults);
      
      if (searchResults.length === 0) {
        toast({
          title: "No Results",
          description: "No matching documents were found for your query.",
        });
      }
    } catch (error) {
      console.error("Failed to search files:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to search your files. Please try again.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Layout>
      <div className="py-6 space-y-8">
        <header>
          <div className="flex flex-col space-y-3">
            <span className="text-sm font-medium text-primary">Search</span>
            <h1 className="text-3xl font-bold tracking-tight">Semantic Search</h1>
            <p className="text-muted-foreground">
              Search your files by meaning, not just keywords
            </p>
          </div>
        </header>

        <div className="py-4">
          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </div>

        <div className="glass-morphism rounded-xl p-6 border border-border">
          <SearchResults results={results} query={currentQuery} />
        </div>
      </div>
    </Layout>
  );
};

export default Search;
