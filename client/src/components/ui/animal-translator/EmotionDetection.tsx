import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { EmotionAnalysisResult } from "@shared/schema";

interface EmotionDetectionProps {
  emotion?: EmotionAnalysisResult;
  isLoading: boolean;
}

const EmotionDetection: React.FC<EmotionDetectionProps> = ({ emotion, isLoading }) => {
  // Emotion color mapping
  const emotionColors = {
    happy: {
      bg: "bg-yellow-400",
      text: "text-yellow-600",
      border: "border-yellow-400",
      bgLight: "bg-yellow-100",
      icon: "😊"
    },
    sad: {
      bg: "bg-blue-400",
      text: "text-blue-600",
      border: "border-blue-400",
      bgLight: "bg-blue-100",
      icon: "😢"
    },
    angry: {
      bg: "bg-red-400",
      text: "text-red-600", 
      border: "border-red-400",
      bgLight: "bg-red-100",
      icon: "😠"
    },
    neutral: {
      bg: "bg-purple-400",
      text: "text-purple-600",
      border: "border-purple-400",
      bgLight: "bg-purple-100",
      icon: "😐"
    }
  };

  // Get current emotion styling
  const currentEmotion = emotion?.dominant || "neutral";
  const emotionStyle = emotionColors[currentEmotion];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-['Baloo_2'] font-bold mb-4">Emotion Detection</h2>
      
      {isLoading ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-4 p-4 rounded-xl bg-neutral-100">
            <Skeleton className="h-16 w-32" />
            <Skeleton className="h-16 w-16 rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      ) : emotion ? (
        <>
          <div className={`flex items-center justify-between mb-4 p-4 rounded-xl ${emotionStyle.bgLight}`}>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold mb-1">Detected Emotion:</span>
              <span className={`text-xl font-['Baloo_2'] font-bold ${emotionStyle.text}`}>
                {currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1)}
              </span>
            </div>
            
            <div className={`${emotionStyle.bg} h-16 w-16 flex items-center justify-center rounded-full text-3xl`}>
              {emotionStyle.icon}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <EmotionBar 
              label="Happiness" 
              value={emotion.scores.happiness} 
              color={emotionColors.happy}
            />
            <EmotionBar 
              label="Sadness" 
              value={emotion.scores.sadness} 
              color={emotionColors.sad}
            />
            <EmotionBar 
              label="Anger" 
              value={emotion.scores.anger} 
              color={emotionColors.angry}
            />
          </div>
        </>
      ) : (
        <div className="text-center p-6 text-gray-500">
          <p>Enter text and translate to see emotion analysis</p>
        </div>
      )}
    </div>
  );
};

interface EmotionBarProps {
  label: string;
  value: number;
  color: {
    bg: string;
    text: string;
    border: string;
    bgLight: string;
  };
}

const EmotionBar: React.FC<EmotionBarProps> = ({ label, value, color }) => {
  return (
    <div className={`p-2 text-center rounded-lg ${color.bgLight} border ${color.border}`}>
      <span className="text-sm font-bold">{label}</span>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
        <div 
          className={`${color.bg} h-2.5 rounded-full`} 
          style={{ width: `${Math.round(value)}%` }}
        />
      </div>
    </div>
  );
};

export default EmotionDetection;
