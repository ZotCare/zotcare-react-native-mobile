export default (
  array: any[],
  start: number = 0,
  end: number = array.length,
) => {
  for (let i = end - 1; i > start; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
