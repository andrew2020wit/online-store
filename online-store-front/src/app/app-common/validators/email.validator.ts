export const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;

export function emailPatternF(str: string) {
  return emailPattern.test(str);
}
