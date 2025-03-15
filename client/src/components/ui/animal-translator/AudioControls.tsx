import React from "react";
import { Play, Download } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AudioControlsProps {
  pitch: number;
  rate: number;
  onPitchChange: (value: number) => void;
  onRateChange: (value: number) => void;
  onPlayAgain: () => void;
  isTranslated: boolean;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  pitch,
  rate,
  onPitchChange,
  onRateChange,
  onPlayAgain,
  isTranslated
}) => {
  const { toast } = useToast();

  const handlePitchChange = (value: number[]) => {
    onPitchChange(value[0]);
  };

  const handleRateChange = (value: number[]) => {
    onRateChange(value[0]);
  };

  const handleDownload = () => {
    toast({
      title: "Feature not available",
      description: "Audio download functionality is not available in this version.",
      variant: "default",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-['Baloo_2'] font-bold mb-4">Voice Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="pitchRange" className="block text-sm font-medium text-gray-700 mb-1">
            Pitch
          </label>
          <Slider
            id="pitchRange"
            min={0.5}
            max={2}
            step={0.1}
            value={[pitch]}
            onValueChange={handlePitchChange}
            className="w-full accent-primary"
          />
        </div>
        
        <div>
          <label htmlFor="rateRange" className="block text-sm font-medium text-gray-700 mb-1">
            Speed
          </label>
          <Slider
            id="rateRange"
            min={0.5}
            max={2}
            step={0.1}
            value={[rate]}
            onValueChange={handleRateChange}
            className="w-full accent-secondary"
          />
        </div>
      </div>
      
      <div className="flex gap-4 mt-4">
        <Button
          onClick={onPlayAgain}
          disabled={!isTranslated}
          className="flex-1 py-3 px-6 bg-accent text-white rounded-xl font-['Baloo_2'] font-bold text-lg transition-all hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 flex items-center justify-center gap-2"
        >
          <Play className="h-5 w-5" /> Play Again
        </Button>
        
        <Button
          onClick={handleDownload}
          disabled={!isTranslated}
          className="flex-1 py-3 px-6 bg-gray-700 text-white rounded-xl font-['Baloo_2'] font-bold text-lg transition-all hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center justify-center gap-2"
        >
          <Download className="h-5 w-5" /> Save Audio
        </Button>
      </div>
    </div>
  );
};

export default AudioControls;
