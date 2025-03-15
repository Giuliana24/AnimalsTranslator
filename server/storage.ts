import { users, type User, type InsertUser, translations, type Translation, type InsertTranslation } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Translation related methods
  getTranslation(id: number): Promise<Translation | undefined>;
  createTranslation(translation: InsertTranslation): Promise<Translation>;
  getTranslationsByUserId(userId: number): Promise<Translation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private translations: Map<number, Translation>;
  currentUserId: number;
  currentTranslationId: number;

  constructor() {
    this.users = new Map();
    this.translations = new Map();
    this.currentUserId = 1;
    this.currentTranslationId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Translation methods
  async getTranslation(id: number): Promise<Translation | undefined> {
    return this.translations.get(id);
  }

  async createTranslation(insertTranslation: InsertTranslation): Promise<Translation> {
    const id = this.currentTranslationId++;
    const translation: Translation = { ...insertTranslation, id };
    this.translations.set(id, translation);
    return translation;
  }

  async getTranslationsByUserId(userId: number): Promise<Translation[]> {
    return Array.from(this.translations.values()).filter(
      (translation) => translation.userId === userId
    );
  }
}

export const storage = new MemStorage();
