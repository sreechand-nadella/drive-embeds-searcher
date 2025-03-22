
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("googleToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // In a real app, this would redirect to the Google OAuth flow
    // For now, we're simulating it with a delay and local storage
    
    // In production, we'd redirect to:
    // window.location.href = `http://localhost:3001/api/auth/google`;
    
    // Simulating successful login for the demo
    setTimeout(() => {
      localStorage.setItem("googleToken", "demo_token");
      toast({
        title: "Success",
        description: "You've been successfully logged in.",
      });
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Drive<span className="text-primary">Search</span>
            </h1>
            <div className="mt-3 space-y-4">
              <p className="text-muted-foreground">
                Find your text files using semantic search powered by AI
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <span>Search by meaning, not just keywords</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="glass-morphism p-8 rounded-xl space-y-6 border border-border">
              <div className="space-y-2">
                <h2 className="text-xl font-medium text-center">Get Started</h2>
                <p className="text-sm text-center text-muted-foreground">
                  Connect your Google Drive to begin searching your text files
                </p>
              </div>
              
              <GoogleAuthButton onClick={handleGoogleLogin} isLoading={isLoading} />
              
              <p className="text-xs text-center text-muted-foreground">
                We only access text files (.txt, .md) and never store your file content permanently
              </p>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">1</div>
                <span>Connect your Google Drive</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">2</div>
                <span>Process your text files for search</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">3</div>
                <span>Search with natural language</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
