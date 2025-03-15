import { EmotionAnalysisResult } from "@shared/schema";

// Translates text to animal language
export function translateText(text: string, animal: string): string {
  if (!text) return '';
  
  const words = text.split(' ');
  const punctuation = /[.,!?;:]/;
  
  // Extract punctuation from last word if present
  let lastWordPunctuation = '';
  const lastWord = words[words.length - 1];
  if (punctuation.test(lastWord)) {
    lastWordPunctuation = lastWord.match(punctuation)?.[0] || '';
  }
  
  switch(animal) {
    case 'duck':
      return words.map(() => 'Quack').join(' ') + (lastWordPunctuation || '!') + ' 🦆';
    case 'cat':
      return words.map(() => 'Meow').join(' ') + (lastWordPunctuation || '!') + ' 🐱';
    case 'frog':
      return words.map(() => 'Ribbit').join(' ') + (lastWordPunctuation || '!') + ' 🐸';
    default:
      return 'Translation error: Unsupported language';
  }
}

// Analyzes emotion from text
export function analyzeEmotion(text: string): EmotionAnalysisResult {
  if (!text) {
    return {
      dominant: 'neutral',
      scores: {
        happiness: 0,
        sadness: 0,
        anger: 0,
        neutral: 100
      }
    };
  }
  
  const lowerText = text.toLowerCase();
  
  // Simple keyword-based emotion detection
  const happyWords = ['happy', 'joy', 'glad', 'wonderful', 'great', 'love', 'like', 'awesome', 'amazing', 'excited', 'smile', 'laugh', 'fun'];
  const sadWords = ['sad', 'unhappy', 'depressed', 'sorry', 'unfortunate', 'miss', 'lonely', 'gloomy', 'disappointing', 'heartbroken', 'cry', 'regret'];
  const angryWords = ['angry', 'mad', 'hate', 'furious', 'annoyed', 'frustrated', 'rage', 'irritated', 'outraged', 'infuriated', 'upset', 'bitter'];
  
  let scores = {
    happiness: 0,
    sadness: 0,
    anger: 0,
    neutral: 15 // baseline
  };
  
  // Check for emotion keywords
  happyWords.forEach(word => {
    if (lowerText.includes(word)) scores.happiness += 15;
  });
  
  sadWords.forEach(word => {
    if (lowerText.includes(word)) scores.sadness += 15;
  });
  
  angryWords.forEach(word => {
    if (lowerText.includes(word)) scores.anger += 15;
  });
  
  // Cap each emotion at 100
  scores.happiness = Math.min(scores.happiness, 100);
  scores.sadness = Math.min(scores.sadness, 100);
  scores.anger = Math.min(scores.anger, 100);
  
  // Calculate remaining percentage for neutral
  const sum = scores.happiness + scores.sadness + scores.anger;
  if (sum < 100) {
    scores.neutral = 100 - sum;
  } else {
    scores.neutral = 0;
    
    // Normalize to make total 100%
    const factor = 100 / sum;
    scores.happiness *= factor;
    scores.sadness *= factor;
    scores.anger *= factor;
  }
  
  // Determine dominant emotion
  let dominant: 'happy' | 'sad' | 'angry' | 'neutral' = 'neutral';
  let max = scores.neutral;
  
  if (scores.happiness > max) {
    dominant = 'happy';
    max = scores.happiness;
  }
  if (scores.sadness > max) {
    dominant = 'sad';
    max = scores.sadness;
  }
  if (scores.anger > max) {
    dominant = 'angry';
    max = scores.anger;
  }
  
  return {
    dominant,
    scores
  };
}
