export function highestSpentCalc(arr: string[] = []): string {
  let highestSpent = 0;
  let returnVal = '';

  arr.forEach((elm: any) => {
    const amount = Number(elm.amount);
    if (amount > highestSpent) {
      highestSpent = amount;
      returnVal = `${amount} spent on ${elm.title}`;
    }
  });

  return returnVal;
}
