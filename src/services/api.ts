
// This is a mock implementation for demo purposes
// In a real app, these would make actual API calls to your backend

import { toast } from "@/hooks/use-toast";

const MOCK_DELAY = 1000; // Simulate network delay

interface File {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
}

interface SearchResult {
  id: string;
  title: string;
  driveLink: string;
  similarity: number; // 0-100
}

// Mock data for demonstration
const MOCK_FILES: File[] = [
  {
    id: "file1",
    name: "Project Notes.txt",
    mimeType: "text/plain",
    webViewLink: "https://drive.google.com/file/d/file1"
  },
  {
    id: "file2",
    name: "Meeting Minutes.md",
    mimeType: "text/markdown",
    webViewLink: "https://drive.google.com/file/d/file2"
  },
  {
    id: "file3",
    name: "Research Paper.txt",
    mimeType: "text/plain",
    webViewLink: "https://drive.google.com/file/d/file3"
  },
  {
    id: "file4",
    name: "Product Ideas.md",
    mimeType: "text/markdown",
    webViewLink: "https://drive.google.com/file/d/file4"
  },
  {
    id: "file5",
    name: "Client Feedback.txt",
    mimeType: "text/plain",
    webViewLink: "https://drive.google.com/file/d/file5"
  }
];

// Mock search results based on keywords
const getMockSearchResults = (query: string): SearchResult[] => {
  // Convert query to lowercase for case-insensitive matching
  const normalizedQuery = query.toLowerCase();
  
  // Keywords to match in the mock data
  const keywordMap: Record<string, string[]> = {
    "project": ["file1"],
    "meeting": ["file2"],
    "research": ["file3"],
    "product": ["file4"],
    "client": ["file5"],
    "idea": ["file4"],
    "note": ["file1"],
    "paper": ["file3"],
    "minute": ["file2"],
    "feedback": ["file5"]
  };
  
  // Find matching keywords
  const matchingFileIds = Object.keys(keywordMap).reduce((matches, keyword) => {
    if (normalizedQuery.includes(keyword)) {
      return [...matches, ...keywordMap[keyword]];
    }
    return matches;
  }, [] as string[]);
  
  // Remove duplicates
  const uniqueFileIds = [...new Set(matchingFileIds)];
  
  // Generate random relevance scores
  return uniqueFileIds.map(id => {
    const file = MOCK_FILES.find(f => f.id === id);
    if (!file) return null;
    
    // Base similarity on how close the match is
    // In a real app, this would come from vector similarity
    const similarity = Math.floor(70 + Math.random() * 30); // Random between 70-100
    
    return {
      id: file.id,
      title: file.name,
      driveLink: file.webViewLink,
      similarity
    };
  }).filter(Boolean) as SearchResult[];
};

/**
 * Fetch text files from Google Drive
 */
export const fetchFiles = async (): Promise<File[]> => {
  // In a real app, this would call your backend API
  // const response = await fetch('/api/files');
  // return response.json();
  
  // For demo, return mock data after delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_FILES);
    }, MOCK_DELAY);
  });
};

/**
 * Process files for semantic search
 */
export const processFiles = async (fileIds: string[]): Promise<void> => {
  // In a real app, this would call your backend API
  // await fetch('/api/ingest', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ fileIds })
  // });
  
  // For demo, just wait after delay
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Processed ${fileIds.length} files`);
      resolve();
    }, MOCK_DELAY * 2);
  });
};

/**
 * Search files using semantic query
 */
export const searchFiles = async (query: string): Promise<SearchResult[]> => {
  // In a real app, this would call your backend API
  // const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  // return response.json();
  
  // For demo, return mock results after delay
  return new Promise(resolve => {
    setTimeout(() => {
      const results = getMockSearchResults(query);
      resolve(results);
    }, MOCK_DELAY);
  });
};
