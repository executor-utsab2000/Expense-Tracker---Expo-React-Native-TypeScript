

export function mostSpentCalc(arr = []): string {
  let uniqArray: string[] = [];

  arr.forEach(({ title }) => {
    if (!uniqArray.includes(title)) {
      uniqArray.push(title);
    }
  });

  let countArray: number[] = [];

  uniqArray.forEach((elm: any) => {
    let count = 0;
    arr.forEach(({ title }) => {
      if (elm == title) {
        count += 1;
      }
    });
    countArray.push(count);
  });
  const highestNumberIndex = countArray.indexOf(Math.max(...countArray));

  return `${countArray[highestNumberIndex]} times spent on ${uniqArray[highestNumberIndex]}`

}

// console.log(mostSpentCalc(arr));
