import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTranslationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import type { TranslationRequest, TranslationResponse, EmotionAnalysisResult } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Text translation and emotion analysis API endpoint
  app.post("/api/translate", async (req, res) => {
    try {
      const { text, language } = req.body as TranslationRequest;
      
      if (!text || !language) {
        return res.status(400).json({ message: "Text and language are required" });
      }
      
      // Analyze emotion from text
      const emotion = analyzeEmotion(text);
      
      // Translate text to animal language
      const translatedText = translateText(text, language);
      
      // Create response
      const response: TranslationResponse = {
        originalText: text,
        translatedText,
        language,
        emotion
      };
      
      // Store translation if user is logged in
      if (req.session?.userId) {
        try {
          const translationData = {
            originalText: text,
            translatedText,
            language,
            emotion: emotion.dominant,
            userId: req.session.userId
          };
          
          const validatedData = insertTranslationSchema.parse(translationData);
          await storage.createTranslation(validatedData);
        } catch (error) {
          console.error("Error storing translation:", error);
          // Continue with the response even if storage fails
        }
      }
      
      res.json(response);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to process translation" });
      }
    }
  });

  // Get user's translation history
  app.get("/api/translations", (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const userId = req.session.userId;
    
    storage.getTranslationsByUserId(userId)
      .then(translations => {
        res.json(translations);
      })
      .catch(error => {
        res.status(500).json({ message: "Failed to fetch translations" });
      });
  });

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}

// Translation function
function translateText(text: string, language: string): string {
  if (!text) return '';
  
  const words = text.split(' ');
  const punctuation = /[.,!?;:]/;
  
  // Extract punctuation from last word if present
  let lastWordPunctuation = '';
  const lastWord = words[words.length - 1];
  if (punctuation.test(lastWord)) {
    lastWordPunctuation = lastWord.match(punctuation)?.[0] || '';
  }
  
  switch(language) {
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

// Emotion analysis function
function analyzeEmotion(text: string): EmotionAnalysisResult {
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
