import memImages from './mem-images';

export const getGrid = (startIndex: number, rows: number, cols: number) => {
  const grid = [];
  let index = startIndex;
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(memImages[index % memImages.length].name);
      index++;
    }
    grid.push(row);
  }
  return grid;
};
