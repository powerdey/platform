import * as fromRecords from './records.reducer';
import { selectRecordsState } from './records.selectors';

describe('Records Selectors', () => {
  it('should select the feature state', () => {
    const result = selectRecordsState({
      [fromRecords.recordsFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
