
import React from "react";
import { FileText, ExternalLink, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SearchResult {
  id: string;
  title: string;
  driveLink: string;
  similarity: number; // 0-100
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, query }) => {
  if (!query) {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-4">
        <Search className="h-10 w-10 text-muted-foreground" />
        <p className="text-muted-foreground">Enter a search query to find your documents</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-4">
        <FileText className="h-10 w-10 text-muted-foreground" />
        <p className="text-muted-foreground">No results found for "{query}"</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium">Results for "{query}"</h2>
        <p className="text-sm text-muted-foreground mt-1">Found {results.length} documents</p>
      </div>
      <Separator />
      <div className="space-y-4">
        {results.map((result) => (
          <div 
            key={result.id}
            className="flex items-start p-4 rounded-lg bg-white dark:bg-gray-800 border border-border neo-morphism transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <FileText className="h-5 w-5 flex-shrink-0 text-blue-500 mt-0.5 mr-3" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium truncate">{result.title}</h3>
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <div className="flex items-center">
                  <span className="mr-2">Relevance:</span>
                  <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full w-24 overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${result.similarity}%` }}
                    />
                  </div>
                  <span className="ml-2">{Math.round(result.similarity)}%</span>
                </div>
              </div>
            </div>
            <a 
              href={result.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 flex-shrink-0 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Open in Google Drive"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Adding this here since it wasn't imported above
const Search = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default SearchResults;
