export default function sum(arr: RecordItem[]) {
  let sum = eval(arr.map((r) => r.amount).join("+"));
  if (sum === undefined) {
    return "0.00";
  } else {
    return sum.toFixed(2);
  }
}
