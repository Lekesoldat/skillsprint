import { differenceInSeconds } from "date-fns";

export const roundToTenthMinute = (date: Date) => {
  const coeff = 1000 * 60 * 10;

  return new Date(Math.ceil(date.getTime() / coeff) * coeff);
};

export const sortAndAggretatePoints = (map: Map<string, number>) => {
  const start = new Date();
  console.log("Starting sort");
  let prev = 0;
  const liste = [...map.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([time, val]) => {
      prev += val;

      return [time, prev] as const;
    });

  console.log(`Completed sort in ${differenceInSeconds(start, new Date())}s`);
  return liste;
};
