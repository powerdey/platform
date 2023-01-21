import * as fromDevice from './device.reducer';
import { selectDeviceState } from './device.selectors';

describe('Device Selectors', () => {
  it('should select the feature state', () => {
    const result = selectDeviceState({
      [fromDevice.deviceFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
