import { PhoneNumberFormatterPipe } from './phone.pipe';

describe('PhoneNumberFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new PhoneNumberFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
