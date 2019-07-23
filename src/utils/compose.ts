export const compose = (...functions: any[]) => (initialValue: any) =>
  functions.reduceRight(
    (accumulatedValue, fn) => fn(accumulatedValue),
    initialValue
  );
