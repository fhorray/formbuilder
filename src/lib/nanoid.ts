import { customAlphabet } from "nanoid";

export const nanoid = (length?: number) => customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@$%&', length ?? 15)();
