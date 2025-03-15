import React, { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TranslationResponse } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface TranslationOutputProps {
  translationResult: TranslationResponse | null;
  isLoading: boolean;
}

const TranslationOutput: React.FC<TranslationOutputProps> = ({ 
  translationResult, 
  isLoading 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (translationResult?.translatedText) {
      navigator.clipboard.writeText(translationResult.translatedText)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error("Failed to copy text: ", err));
    }
  };

  const getWordCount = () => {
    if (!translationResult?.translatedText) return "Words: 0 | Characters: 0";
    const words = translationResult.translatedText.split(/\s+/).length;
    const chars = translationResult.translatedText.length;
    return `Words: ${words} | Characters: ${chars}`;
  };

  return (
    <div className="relative mb-8 bg-white rounded-2xl shadow-lg p-6 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0 after:border-[20px] after:border-transparent after:border-t-white after:border-b-0 after:ml-[-20px] after:mb-[-20px]">
      <h2 className="text-2xl font-['Baloo_2'] font-bold mb-4">Animal Translation</h2>
      
      <div className="bg-neutral-50 p-4 rounded-xl min-h-[150px]">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        ) : translationResult ? (
          <p className="text-xl font-['Baloo_2']">
            {translationResult.translatedText}
          </p>
        ) : (
          <p className="text-gray-500 text-center py-6">
            No translation yet. Enter text and press translate.
          </p>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          {translationResult ? getWordCount() : "Words: 0 | Characters: 0"}
        </div>
        
        <Button
          onClick={handleCopy}
          disabled={!translationResult || isLoading}
          variant="outline"
          size="sm"
          className="py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
};

export default TranslationOutput;
