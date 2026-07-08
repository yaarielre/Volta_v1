const storage: Record<string, string> = {};

export const secureStorage = {
  async get(key: string): Promise<string | null> {
    return storage[key] ?? null;
  },
  async set(key: string, value: string): Promise<void> {
    storage[key] = value;
  },
  async delete(key: string): Promise<void> {
    delete storage[key];
  },
};
