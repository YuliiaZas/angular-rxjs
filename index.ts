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
  return +(+value).toFixed(2);
};

const addOnChange$ = (input: HTMLInputElement) =>
  fromEvent(input, 'change').pipe(
    map(getValueFromInput),
    map(convertValueToRoundedNumber)
  );

const loanLengthInput$ = fromEvent(loanLengthInput, 'change').pipe(
  map(getValueFromInput),
  map(convertValueToRoundedNumber),
  startWith(convertValueToRoundedNumber(loanLengthInput.value))
);

combineLatest([
  addOnChange$(loanInterestInput),
  addOnChange$(loanAmountInput),
  loanLengthInput$
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
