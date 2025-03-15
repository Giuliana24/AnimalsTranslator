import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const translations = pgTable("translations", {
  id: serial("id").primaryKey(),
  originalText: text("original_text").notNull(),
  translatedText: text("translated_text").notNull(),
  language: text("language").notNull(), // 'duck', 'cat', or 'frog'
  emotion: text("emotion").notNull(), // 'happy', 'sad', 'angry', or 'neutral'
  userId: integer("user_id").references(() => users.id),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTranslationSchema = createInsertSchema(translations).pick({
  originalText: true,
  translatedText: true,
  language: true,
  emotion: true,
  userId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTranslation = z.infer<typeof insertTranslationSchema>;
export type Translation = typeof translations.$inferSelect;

// Emotion analysis result type
export type EmotionAnalysisResult = {
  dominant: 'happy' | 'sad' | 'angry' | 'neutral';
  scores: {
    happiness: number;
    sadness: number;
    anger: number;
    neutral: number;
  };
};

// Translation request type
export type TranslationRequest = {
  text: string;
  language: 'duck' | 'cat' | 'frog';
};

// Translation response type
export type TranslationResponse = {
  originalText: string;
  translatedText: string;
  language: 'duck' | 'cat' | 'frog';
  emotion: EmotionAnalysisResult;
};
