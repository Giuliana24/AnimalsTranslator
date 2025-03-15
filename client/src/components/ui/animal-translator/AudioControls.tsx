import React from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioControlsProps {
  pitch: number;
  rate: number;
  onPitchChange: (value: number) => void;
  onRateChange: (value: number) => void;
  onPlayAgain: () => void;
  isTranslated: boolean;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  onPlayAgain,
  isTranslated
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-['Baloo_2'] font-bold mb-4">Audio Control</h2>
      
      <div className="flex gap-4 mt-4 justify-center">
        <Button
          onClick={onPlayAgain}
          disabled={!isTranslated}
          className="w-2/3 py-3 px-6 bg-accent text-white rounded-xl font-['Baloo_2'] font-bold text-lg transition-all hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 flex items-center justify-center gap-2"
        >
          <Play className="h-5 w-5" /> Play Again
        </Button>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500 italic">
        <p>No configuration needed - animal sounds are configured automatically based on detected emotion!</p>
        <p className="mt-1 text-xs text-purple-600 font-medium">Keep an ear out for a surprise dolphin sound that may appear randomly!</p>
      </div>
    </div>
  );
};

export default AudioControls;
