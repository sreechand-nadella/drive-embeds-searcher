
import React from "react";
import { FileText, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface File {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  indexedStatus?: "pending" | "complete" | "error";
}

interface FileListProps {
  files: File[];
  isLoading: boolean;
  onProcessFiles: () => void;
  processingStatus: "idle" | "processing" | "complete" | "error";
}

const FileList: React.FC<FileListProps> = ({ 
  files, 
  isLoading, 
  onProcessFiles, 
  processingStatus 
}) => {
  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-pulse">
        <Loader2 className="h-10 w-10 text-primary animate-spinner" />
        <p className="text-muted-foreground">Loading your files...</p>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-4">
        <FileText className="h-10 w-10 text-muted-foreground" />
        <p className="text-muted-foreground">No compatible text files found in your Drive</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Text Files in Your Drive</h2>
        <Button 
          onClick={onProcessFiles}
          disabled={processingStatus === "processing" || files.length === 0}
          className="space-x-2"
        >
          {processingStatus === "processing" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spinner" />
              <span>Processing...</span>
            </>
          ) : processingStatus === "complete" ? (
            <>
              <Check className="h-4 w-4" />
              <span>Processed</span>
            </>
          ) : (
            <span>Process Files</span>
          )}
        </Button>
      </div>
      <Separator />
      <div className="space-y-3">
        {files.map((file) => (
          <div 
            key={file.id}
            className="flex items-center p-3 rounded-lg bg-white dark:bg-gray-800 border border-border neo-morphism transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <FileText className="h-5 w-5 flex-shrink-0 text-blue-500 mr-3" />
            <div className="flex-1 min-w-0">
              <a 
                href={file.webViewLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm font-medium truncate hover:underline"
              >
                {file.name}
              </a>
            </div>
            {file.indexedStatus && (
              <div className="ml-3 flex-shrink-0">
                {file.indexedStatus === "complete" ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Check className="h-3 w-3 mr-1" />
                    Indexed
                  </span>
                ) : file.indexedStatus === "pending" ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Loader2 className="h-3 w-3 mr-1 animate-spinner" />
                    Pending
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Error
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
