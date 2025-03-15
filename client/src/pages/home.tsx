import { useState } from "react";
import TextInputArea from "@/components/ui/animal-translator/TextInputArea";
import LanguageSelector from "@/components/ui/animal-translator/LanguageSelector";
import EmotionDetection from "@/components/ui/animal-translator/EmotionDetection";
import AnimalCharacter from "@/components/ui/animal-translator/AnimalCharacter";
import TranslationOutput from "@/components/ui/animal-translator/TranslationOutput";
import AudioControls from "@/components/ui/animal-translator/AudioControls";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { TranslationResponse } from "@shared/schema";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { playDuckSound } from "../assets/duck-quack";

export default function Home() {
  const { toast } = useToast();
  
  // Speech synthesis settings
  const { pitch, setPitch, rate, setRate, speak } = useTextToSpeech();
  
  // State for human text input
  const [humanText, setHumanText] = useState("");
  
  // State for selected animal language
  const [language, setLanguage] = useState<"duck" | "cat" | "frog">("duck");
  
  // Translation results state
  const [translationResult, setTranslationResult] = useState<TranslationResponse | null>(null);
  
  // Translation API mutation
  const translateMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/translate", {
        text: humanText,
        language: language,
      });
      return response.json();
    },
    onSuccess: (data: TranslationResponse) => {
      setTranslationResult(data);
    },
    onError: (error) => {
      toast({
        title: "Translation failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });
  
  // Handle translate button click
  const handleTranslate = () => {
    if (!humanText.trim()) {
      toast({
        title: "Empty text",
        description: "Please enter some text to translate",
        variant: "destructive",
      });
      return;
    }
    
    translateMutation.mutate();
  };
  
  // Handle speak button click
  const handleSpeak = () => {
    if (!translationResult) {
      if (humanText.trim()) {
        handleTranslate();
      } else {
        toast({
          title: "Nothing to speak",
          description: "Please enter text and translate it first",
          variant: "destructive",
        });
      }
      return;
    }
    
    // For duck language, use appropriate sound based on emotion
    if (language === 'duck') {
      // Calculate number of sounds based on text length (minimum of 2, maximum of 10)
      const wordCount = translationResult.translatedText.split(' ').length;
      const soundCount = Math.max(2, Math.min(Math.ceil(wordCount / 2), 10));
      
      // Play the appropriate duck sound based on emotion
      playDuckSound(translationResult.emotion.dominant, soundCount);
    } else {
      // For other animals use the text-to-speech
      speak(translationResult.translatedText, language, translationResult.emotion.dominant);
    }
  };
  
  // Handle play again button click
  const handlePlayAgain = () => {
    if (translationResult) {
      // For duck language, use appropriate sound based on emotion
      if (language === 'duck') {
        // Calculate number of sounds based on text length (minimum of 2, maximum of 10)
        const wordCount = translationResult.translatedText.split(' ').length;
        const soundCount = Math.max(2, Math.min(Math.ceil(wordCount / 2), 10));
        
        // Play the appropriate duck sound based on emotion
        playDuckSound(translationResult.emotion.dominant, soundCount);
      } else {
        // For other animals use the text-to-speech
        speak(translationResult.translatedText, language, translationResult.emotion.dominant);
      }
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen font-sans text-neutral-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-['Baloo_2'] text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Animal Translator
          </h1>
          <p className="text-lg mt-2 text-neutral-700">
            Translate your human text to animal language and hear it with emotions!
          </p>
        </header>

        <main className="flex flex-col md:flex-row gap-8">
          {/* Input Section */}
          <section className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-['Baloo_2'] font-bold mb-4">Human Text</h2>
              
              <TextInputArea 
                value={humanText} 
                onChange={setHumanText} 
              />
              
              <LanguageSelector 
                selectedLanguage={language} 
                onSelectLanguage={setLanguage} 
              />
              
              <div className="flex gap-4 mt-6">
                <button 
                  onClick={handleTranslate}
                  disabled={translateMutation.isPending || !humanText.trim()}
                  className="flex-1 py-3 px-6 bg-primary text-white rounded-xl font-['Baloo_2'] font-bold text-lg transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {translateMutation.isPending ? (
                    <span className="animate-spin">⏳</span>
                  ) : (
                    <>
                      <span>🔄</span> Translate
                    </>
                  )}
                </button>
                
                <button 
                  onClick={handleSpeak}
                  disabled={translateMutation.isPending}
                  className="flex-1 py-3 px-6 bg-secondary text-white rounded-xl font-['Baloo_2'] font-bold text-lg transition-all hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>🔊</span> Speak
                </button>
              </div>
            </div>

            <EmotionDetection 
              emotion={translationResult?.emotion} 
              isLoading={translateMutation.isPending}
            />
          </section>

          {/* Output Section */}
          <section className="w-full md:w-1/2 flex flex-col gap-6">
            <AnimalCharacter 
              animal={language} 
              emotion={translationResult?.emotion?.dominant || "neutral"} 
            />
            
            <TranslationOutput 
              translationResult={translationResult} 
              isLoading={translateMutation.isPending}
            />
            
            <AudioControls 
              pitch={pitch}
              rate={rate}
              onPitchChange={setPitch}
              onRateChange={setRate}
              onPlayAgain={handlePlayAgain}
              isTranslated={!!translationResult}
            />
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 pb-8">
          <p>Made with <span className="text-red-500">❤</span> for animal language enthusiasts</p>
          <p className="text-sm mt-2">© {new Date().getFullYear()} Animal Translator | All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}
