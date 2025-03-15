import { useState, useCallback } from "react";

type AnimalLanguage = "duck" | "cat" | "frog";
type Emotion = "happy" | "sad" | "angry" | "neutral";

export function useTextToSpeech() {
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);

  // Enhanced animal voice configurations
  const animalVoiceConfigs = {
    duck: {
      pitch: 1.8,   // Higher pitched duck
      rate: 1.5,    // Faster duck
    },
    cat: {
      pitch: 1.3,   // Medium-high pitch cat
      rate: 0.8,    // Slower cat
    },
    frog: {
      pitch: 0.6,   // Lower pitched frog
      rate: 0.6,    // Slower frog
    },
  };

  // Emotion voice configurations with stronger contrasts
  const emotionVoiceConfigs = {
    happy: {
      pitch: 1.4,
      rate: 1.3,
    },
    sad: {
      pitch: 0.7,
      rate: 0.6,
    },
    angry: {
      pitch: 1.5,
      rate: 1.7,    // Very fast for angry
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

    // Apply animal, emotion, and user adjustments to voice with more extreme settings
    utterance.pitch = pitch * animalConfig.pitch * emotionConfig.pitch;
    utterance.rate = rate * animalConfig.rate * emotionConfig.rate;
    
    // Apply volume variation based on emotion
    if (emotion === 'angry') {
      utterance.volume = 1.0;  // Full volume for angry
    } else if (emotion === 'sad') {
      utterance.volume = 0.8;  // Lower volume for sad
    } else {
      utterance.volume = 0.9;  // Normal volume for happy/neutral
    }

    // Get available voices
    let voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      // Some browsers need to wait for voices to load
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
      };
    }
    
    // Select voice based on animal
    let selectedVoice = null;
    
    // Try to select different voices based on animal type
    if (animalLanguage === 'duck') {
      // Try to find high-pitched female voice for duck
      selectedVoice = voices.find(voice => 
        voice.name.includes("female") || 
        voice.name.includes("Female") || 
        voice.name.includes("girl")
      );
    } else if (animalLanguage === 'cat') {
      // Try to find medium-pitched voice for cat
      selectedVoice = voices.find(voice => 
        !voice.name.toLowerCase().includes("male") && 
        !voice.name.toLowerCase().includes("female")
      );
    } else if (animalLanguage === 'frog') {
      // Try to find deep voice for frog
      selectedVoice = voices.find(voice => 
        voice.name.includes("male") || 
        voice.name.includes("Male")
      );
    }
    
    // If we found a voice, use it
    if (selectedVoice) {
      utterance.voice = selectedVoice;
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
