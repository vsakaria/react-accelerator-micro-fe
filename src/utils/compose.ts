export const compose = (...functions: any[]) => (initialValue: any): any[] =>
  functions.reduceRight(
    (accumulatedValue, fn) => fn(accumulatedValue),
    initialValue
  );
