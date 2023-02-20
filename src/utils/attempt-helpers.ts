export const roundToNthMinute = (date: Date, n = 5) => {
  const coeff = 1000 * 60 * n;

  return new Date(Math.ceil(date.getTime() / coeff) * coeff);
};

export const aggregateTotalRespondentsAtTimestamp = (
  respondents: Map<string, string[]>
) => {
  const all: string[] = [];
  const timestampRespondents = new Map<string, number>();

  // Loopthrough all timestamps
  [...respondents.entries()].forEach(([timestamp, res]) => {
    // Loop through all respondents at timestamp.
    res.forEach((r) => {
      // If the respondent is not in the list of all respondents, add it.
      if (!all.includes(r)) all.push(r);
    });

    // Update unique, total respondents at timestamp
    timestampRespondents.set(timestamp, all.length);
  });

  return timestampRespondents;
};

export const sortAndAggretatePoints = (
  respondents: Map<string, string[]>,
  map: Map<string, { groupPoints: number; userPoints: number }>
) => {
  const totalRespondantsByTimestamp =
    aggregateTotalRespondentsAtTimestamp(respondents);

  let prevGroup = 0;
  let prevUser = 0;

  // For each timestamp and its current points
  const liste = [...map.entries()]

    // Sort by timestamp
    .sort((a, b) => a[0].localeCompare(b[0]))

    .map(([timestamp, val]) => {
      // Get total respondents at timestamp
      const total = totalRespondantsByTimestamp.get(timestamp)!;

      // Accumulate points
      prevGroup += val.groupPoints;
      prevUser += val.userPoints;

      // Return object with timestamp, user points and average group points at each timestamp
      return {
        timestamp,
        user_sum: Math.round(prevUser),
        group_sum: Math.round(prevGroup / total),
      } as const;
    });

  return liste;
};
