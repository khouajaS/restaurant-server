import { isInt } from './utils';

describe('test isInt', () => {
  test('isInt', () => {
    const input =  ['1',  'b',   '1.1', '12', '0', '-6.2', '-1']; // eslint-disable-line no-multi-spaces
    const output = [true, false, false, true, true, false, true];
    expect(input.map(isInt)).toEqual(output);
  });
});
