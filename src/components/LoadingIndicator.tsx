
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingIndicatorProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = "md", 
  message = "Loading..." 
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <Loader2 className={`text-primary animate-spinner ${sizeClasses[size]}`} />
      {message && <p className="text-muted-foreground">{message}</p>}
    </div>
  );
};

export default LoadingIndicator;
