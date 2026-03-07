import { type User, type InsertUser } from "../shared/schema.js";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods you might need
export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user: User) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();

    const user: User = {
      id,
      name: insertUser.name,
      username: insertUser.username,
      phone: insertUser.phone,
      email: insertUser.email,
      password: insertUser.password,

      // required fields for the User type
      isAdmin: false,
      status: "active",
      friends: [],
      friendRequests: [],
      sentRequests: [],

      // optional fields
      profilePicture: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
