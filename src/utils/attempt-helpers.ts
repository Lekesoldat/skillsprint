export const roundToTenthMinute = (date: Date) => {
  const coeff = 1000 * 60 * 10;

  return new Date(Math.ceil(date.getTime() / coeff) * coeff);
};

export const sortAndAggretatePoints = (
  map: Map<string, { groupPoints: number; userPoints: number }>
) => {
  let prevGroup = 0;
  let prevUser = 0;
  const liste = [...map.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([timestamp, val]) => {
      prevGroup += val.groupPoints;
      prevUser += val.userPoints;

      return {
        timestamp,
        groupPoints: Math.round(prevGroup),
        userPoints: Math.round(prevUser),
      } as const;
    });

  return liste;
};
