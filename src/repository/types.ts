const Omit = <T, K extends keyof T>(
  Class: new (_endpoint: string) => T,
  keys: K[]
): new (_endpoint: string) => Omit<T, (typeof keys)[number]> => Class

export { Omit }
