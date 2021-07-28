export function calculateMortgage(
  loanInterest: number,
  loanAmount: number,
  loanLength: number
): string {
  const calculatedInterest = (loanInterest * 0.01) / 12;
  const total =
    (loanAmount * calculatedInterest) /
    (1 - Math.pow(1 / (1 + calculatedInterest), loanLength));

  return total.toFixed(2);
}
