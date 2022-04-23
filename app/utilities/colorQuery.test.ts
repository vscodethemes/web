import { validate } from './colorQuery';

test('hex', () => {
  expect(() => validate('hex|000000')).not.toThrowError();
  expect(() => validate('hex|FFFFFF')).not.toThrowError();
  expect(() => validate('hex|000')).not.toThrowError();
  expect(() => validate('hex|FFF')).not.toThrowError();
  expect(() => validate('#000000')).not.toThrowError();
  expect(() => validate('#FFFFFF')).not.toThrowError();
  expect(() => validate('#000')).not.toThrowError();
  expect(() => validate('#FFF')).not.toThrowError();
});

test('rgb', () => {
  expect(() => validate('rgb|0,0,0')).not.toThrowError();
  expect(() => validate('rgb|255,255,255')).not.toThrowError();
  expect(() => validate('rgb(0,0,0)')).not.toThrowError();
  expect(() => validate('rgb(255,255,255)')).not.toThrowError();
});

test('hsl', () => {
  expect(() => validate('hsl|0,0,0')).not.toThrowError();
  expect(() => validate('hsl|0,50,100')).not.toThrowError();
  expect(() => validate('hsl(0,0%,0%)')).not.toThrowError();
  expect(() => validate('hsl(0,50%,100%)')).not.toThrowError();
});
