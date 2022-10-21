import { terraform } from './terraform';

describe('terraform', () => {
  it('should work', () => {
    expect(terraform()).toEqual('terraform');
  });
});
