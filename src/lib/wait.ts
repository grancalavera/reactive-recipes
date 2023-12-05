export const wait = (howLong: number = 1000): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), howLong));
