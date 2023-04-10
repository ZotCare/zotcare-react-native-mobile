export default (min: number, max: number, count: number): number[] => {
  const taken = new Set<number>();
  while (taken.size < count) {
    taken.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from<number>(taken);
};
