import { JwtTwoFactorGuard } from './jwt-two-factor.guard';

describe('JwtTwoFactorGuard', () => {
  it('should be defined', () => {
    expect(new JwtTwoFactorGuard()).toBeDefined();
  });
});
