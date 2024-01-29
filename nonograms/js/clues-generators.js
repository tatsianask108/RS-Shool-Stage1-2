const leftCluesGenerator = (matrix) => {
  const result = matrix.map((row) => {
    let sum = 0;
    const rowResult = [];

    row.forEach((element) => {
      if (element !== 0) {
        sum += element;
      } else if (sum !== 0) {
        rowResult.push(sum);
        sum = 0;
      }
    });

    if (sum !== 0) {
      rowResult.push(sum);
    }

    return rowResult;
  });

  const fillArrays = (cluesLeft) => {
    for (let i = 0; i < cluesLeft.length; i++) {
      const currentArray = cluesLeft[i];
      const currentLength = currentArray.length;

      if (currentLength < cluesLeft.length) {
        const zerosToAdd = cluesLeft.length - currentLength;
        const zerosArray = Array(zerosToAdd).fill(0);
        cluesLeft[i] = zerosArray.concat(currentArray);
      }
    }
    return cluesLeft;
  };

  const cluesLeft = fillArrays(result);
  return cluesLeft;
};

const topCluesGenerator = (matrix) => {
  let res = matrix.map((row) => {
    return Array(row.length).fill(0);
  });

  for (let col = 0; col < matrix.length; col++) {
    let sum = 0;
    for (let row = 0; row < matrix.length; row++) {
      if (matrix[row][col] !== 0) {
        sum++;
      }

      if (!matrix[row + 1] || (matrix[row + 1] && matrix[row + 1][col] === 0)) {
        res[row][col] = sum;
        sum = 0;
      }
    }
  }
  return res;
};

export { leftCluesGenerator, topCluesGenerator };
