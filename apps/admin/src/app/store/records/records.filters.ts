export enum TimeRange {
  ALL,
  DAY,
  WEEK,
  MONTH,
  SIX_MONTHS,
  YEAR,
}

export const timeRangeOptions: {
  value: TimeRange;
  viewValue: string;
}[] = [
  { value: TimeRange.ALL, viewValue: 'All' },
  { value: TimeRange.DAY, viewValue: 'Day' },
  { value: TimeRange.WEEK, viewValue: 'Week' },
  { value: TimeRange.MONTH, viewValue: 'Month' },
  { value: TimeRange.SIX_MONTHS, viewValue: 'Six Months' },
  { value: TimeRange.YEAR, viewValue: 'Year' },
];
