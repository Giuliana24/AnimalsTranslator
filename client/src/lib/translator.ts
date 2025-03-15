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
  if (!text || text.trim() === '') {
    return {
      dominant: 'happy', // Default to happy instead of neutral
      scores: {
        happiness: 80,
        sadness: 10,
        anger: 5,
        neutral: 5
      }
    };
  }
  
  const lowerText = text.toLowerCase();
  
  // Expanded keyword lists for better emotion detection
  const happyWords = ['happy', 'joy', 'glad', 'wonderful', 'great', 'love', 'like', 'awesome', 'amazing', 'excited', 'smile', 'laugh', 'fun', 'feliz', 'contento', 'alegre', 'encantado', 'genial', 'bueno', 'excelente', 'fantástico', 'good', 'nice', 'pleasant', 'enjoy', 'delight', 'pleased', 'cheerful', 'blessed', 'fortunate', 'grateful', 'satisfecho', 'gracias', 'thank', 'beautiful', 'hermoso', 'brilliant', 'positive', 'friendly', 'warm', 'win', 'success', 'celebrate', 'hope', 'dream', 'bright', 'sunshine', 'rainbow', 'pleased', 'proud'];
  
  const sadWords = ['sad', 'unhappy', 'depressed', 'sorry', 'unfortunate', 'miss', 'lonely', 'gloomy', 'disappointing', 'heartbroken', 'cry', 'regret', 'triste', 'desanimado', 'pena', 'melancolía', 'lamento', 'deprimido', 'bad', 'worse', 'worst', 'terrible', 'horrible', 'awful', 'hurt', 'pain', 'grief', 'suffer', 'hopeless', 'despair', 'distress', 'miserable', 'nostalgia', 'abandoned', 'rejected', 'alone', 'solo', 'solitario', 'lost', 'broken', 'tear', 'lágrima', 'llorar', 'anxious', 'worried', 'concern', 'preocupado', 'miedo', 'fear', 'fail', 'failure', 'difficult', 'difícil', 'dark', 'oscuro'];
  
  const angryWords = ['angry', 'mad', 'hate', 'furious', 'annoyed', 'frustrated', 'rage', 'irritated', 'outraged', 'infuriated', 'upset', 'bitter', 'enojado', 'enfadado', 'furioso', 'molesto', 'rabia', 'irratate', 'disgusting', 'hostile', 'fierce', 'violent', 'aggressive', 'agresivo', 'violento', 'fierce', 'vengeful', 'venganza', 'betrayed', 'traición', 'traicionado', 'stupid', 'estúpido', 'idiota', 'idiot', 'ridiculous', 'ridículo', 'damn', 'hell', 'horrible', 'fight', 'pelear', 'discutir', 'argue', 'complain', 'queja', 'intolerable', 'unbearable', 'insoportable', 'unfair', 'injusto', 'wrong', 'mistake', 'error', 'terrible', 'awful', 'destroy', 'destruir', 'kill', 'matar'];
  
  let scores = {
    happiness: 5, // Lower base values
    sadness: 5,
    anger: 5,
    neutral: 0 // Set neutral baseline to 0
  };
  
  // More sensitive emotion detection with weighted scoring
  happyWords.forEach(word => {
    if (lowerText.includes(word)) scores.happiness += 20;
    // Check for word at beginning or as standalone word for stronger signal
    if (new RegExp('\\b' + word + '\\b').test(lowerText)) scores.happiness += 10;
  });
  
  sadWords.forEach(word => {
    if (lowerText.includes(word)) scores.sadness += 20;
    if (new RegExp('\\b' + word + '\\b').test(lowerText)) scores.sadness += 10;
  });
  
  angryWords.forEach(word => {
    if (lowerText.includes(word)) scores.anger += 20;
    if (new RegExp('\\b' + word + '\\b').test(lowerText)) scores.anger += 10;
  });
  
  // Analyze sentence structure for additional context
  if (lowerText.includes('!')) {
    // Exclamation points suggest intensity
    if (scores.happiness > scores.sadness && scores.happiness > scores.anger) {
      scores.happiness += 15; // Amplify existing emotion
    } else if (scores.anger > scores.happiness && scores.anger > scores.sadness) {
      scores.anger += 15;
    }
  }
  
  // Cap each emotion at 100
  scores.happiness = Math.min(scores.happiness, 100);
  scores.sadness = Math.min(scores.sadness, 100);
  scores.anger = Math.min(scores.anger, 100);
  
  // Calculate the sum without neutral to get more decisive emotion scoring
  const emotionSum = scores.happiness + scores.sadness + scores.anger;
  
  // Assign minimal neutral value only if no strong emotions were detected
  if (emotionSum < 30) {
    // Even with no clear emotions, we'll emphasize one slightly
    const max = Math.max(scores.happiness, scores.sadness, scores.anger);
    if (max === scores.happiness) scores.happiness += 20;
    else if (max === scores.sadness) scores.sadness += 20;
    else scores.anger += 20;
  }
  
  // Recalculate after possible adjustments
  const totalSum = scores.happiness + scores.sadness + scores.anger;
  
  // Normalize to make total 100%
  if (totalSum > 0) {
    const factor = 100 / totalSum;
    scores.happiness = Math.round(scores.happiness * factor);
    scores.sadness = Math.round(scores.sadness * factor);
    scores.anger = Math.round(scores.anger * factor);
    scores.neutral = 0; // No neutral component
  } else {
    // Fallback - should never happen with our adjustments above
    scores.happiness = 80;
    scores.sadness = 10;
    scores.anger = 10;
    scores.neutral = 0;
  }
  
  // Determine dominant emotion - neutral is no longer an option
  let dominant: 'happy' | 'sad' | 'angry' | 'neutral' = 'happy'; // Default
  let max = scores.happiness;
  
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
