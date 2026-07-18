jest.mock("@react-native-async-storage/async-storage", () => {
  const store = new Map<string, string>();

  return {
    clear: jest.fn(async () => {
      store.clear();
    }),
    getItem: jest.fn(async (key: string) => store.get(key) ?? null),
    removeItem: jest.fn(async (key: string) => {
      store.delete(key);
    }),
    setItem: jest.fn(async (key: string, value: string) => {
      store.set(key, value);
    }),
  };
});
