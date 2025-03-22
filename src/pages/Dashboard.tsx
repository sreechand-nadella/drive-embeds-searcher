
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import FileList from "@/components/FileList";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useToast } from "@/hooks/use-toast";
import { fetchFiles, processFiles } from "@/services/api";

interface File {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  indexedStatus?: "pending" | "complete" | "error";
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingStatus, setProcessingStatus] = useState<"idle" | "processing" | "complete" | "error">("idle");

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("googleToken");
    if (!token) {
      navigate("/");
      return;
    }

    // Fetch files
    loadFiles();
  }, [navigate]);

  const loadFiles = async () => {
    setIsLoading(true);
    try {
      const data = await fetchFiles();
      setFiles(data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch your files. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProcessFiles = async () => {
    setProcessingStatus("processing");
    try {
      await processFiles(files.map(file => file.id));
      setProcessingStatus("complete");
      
      // Update the files with indexedStatus
      setFiles(files.map(file => ({
        ...file,
        indexedStatus: "complete"
      })));
      
      toast({
        title: "Files Processed",
        description: "Your files have been processed and are ready for searching.",
      });
    } catch (error) {
      console.error("Failed to process files:", error);
      setProcessingStatus("error");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your files. Please try again.",
      });
    }
  };

  return (
    <Layout>
      <div className="py-6 space-y-6">
        <header>
          <div className="flex flex-col space-y-3">
            <span className="text-sm font-medium text-primary">Dashboard</span>
            <h1 className="text-3xl font-bold tracking-tight">Your Drive Files</h1>
            <p className="text-muted-foreground">
              Process your text files to make them searchable with AI
            </p>
          </div>
        </header>

        <div className="glass-morphism rounded-xl p-6 border border-border">
          <FileList 
            files={files}
            isLoading={isLoading}
            onProcessFiles={handleProcessFiles}
            processingStatus={processingStatus}
          />
        </div>

        {processingStatus === "complete" && (
          <div className="flex flex-col items-center space-y-4 p-8 animate-fade-in">
            <p className="text-center font-medium">
              All files have been processed! Ready to search?
            </p>
            <button
              onClick={() => navigate("/search")}
              className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Go to Search
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
