// Build a Mortgage Claculator using Rxjs and calculateMortgage method
import { fromEvent, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { calculateMortgage } from './calculate';

const loanAmountInput: HTMLInputElement = document.querySelector('#loanAmount');
const loanInterestInput: HTMLInputElement = document.querySelector(
  '#loanInterest'
);
const loanLengthInput: HTMLInputElement = document.querySelector('#loanLength');
const resultBox = document.querySelector('#result');

const getValueFromInput = (ev: Event) => (ev.target as HTMLInputElement).value;

const convertValueToRoundedNumber = (value: string): number => {
  return Number((Number(value)).toFixed(2));
};

const getValueOnChange$ = (input: HTMLInputElement) => {
  if (input === loanLengthInput) {
    return fromEvent(input, 'change').pipe(
      map(getValueFromInput),
      map(convertValueToRoundedNumber),
      startWith(input.value),
      map(convertValueToRoundedNumber)
    );
  }
  return fromEvent(input, 'change').pipe(
    map(getValueFromInput),
    map(convertValueToRoundedNumber)
  );
};

combineLatest([
  getValueOnChange$(loanInterestInput),
  getValueOnChange$(loanAmountInput),
  getValueOnChange$(loanLengthInput)
])
  .pipe(
    map(([loanInterest, loanAmount, loanLength]) => {
      try {
        return {
          result: calculateMortgage(loanInterest, loanAmount, loanLength)
        };
      } catch (error) {
        return { error };
      }
    })
  )
  .subscribe(({ result, error }) => {
    console.log({ result, error });
    resultBox.textContent = error ? error.message : result;
  });
