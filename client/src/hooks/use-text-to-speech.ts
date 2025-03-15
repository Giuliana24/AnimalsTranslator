import { useState, useCallback } from "react";

type AnimalLanguage = "duck" | "cat" | "frog";
type Emotion = "happy" | "sad" | "angry" | "neutral";

export function useTextToSpeech() {
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);

  // Animal voice configurations
  const animalVoiceConfigs = {
    duck: {
      pitch: 1.5,
      rate: 1.2,
    },
    cat: {
      pitch: 1.2,
      rate: 0.9,
    },
    frog: {
      pitch: 0.8,
      rate: 0.7,
    },
  };

  // Emotion voice configurations
  const emotionVoiceConfigs = {
    happy: {
      pitch: 1.2,
      rate: 1.1,
    },
    sad: {
      pitch: 0.8,
      rate: 0.8,
    },
    angry: {
      pitch: 1.3,
      rate: 1.4,
    },
    neutral: {
      pitch: 1,
      rate: 1,
    },
  };

  const speak = useCallback((
    text: string,
    animalLanguage: AnimalLanguage = "duck",
    emotion: Emotion = "neutral"
  ) => {
    // Stop any currently speaking synthesis
    window.speechSynthesis.cancel();

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Get base voice settings from animal and emotion
    const animalConfig = animalVoiceConfigs[animalLanguage];
    const emotionConfig = emotionVoiceConfigs[emotion];

    // Apply animal, emotion, and user adjustments to voice
    utterance.pitch = pitch * animalConfig.pitch * emotionConfig.pitch;
    utterance.rate = rate * animalConfig.rate * emotionConfig.rate;

    // Get available voices (optional - for more advanced voice selection)
    const voices = window.speechSynthesis.getVoices();
    
    // Try to use a female voice as default if available
    const femaleVoice = voices.find(voice => 
      voice.name.includes("female") || 
      voice.name.includes("Female") || 
      voice.name.includes("girl") ||
      voice.name.includes("Girl")
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    // Speak the text
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [pitch, rate]);

  return {
    pitch,
    setPitch,
    rate,
    setRate,
    speak,
  };
}
