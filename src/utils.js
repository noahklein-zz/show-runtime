const divMod = (numerator, denominator) => [
  Math.floor(numerator / denominator),
  numerator % denominator
];

exports.divMod = divMod;

exports.sum = arr => arr.reduce((acc, next) => acc + next, 0);

exports.minToDuration = min => {
  const [days, daysRemainder] = divMod(min, 24 * 60);
  const [hrs, mins] = divMod(daysRemainder, 60);
  return {
    days,
    hrs,
    mins
  };
};

exports.formatOutput = (days, hrs, mins) => {
  const out = [
    days && `${days} days`,
    hrs && `${hrs} hours`,
    mins && `${mins} minutes`
  ]
    .filter(Boolean)
    .join(" ");
  return out || "0 minutes";
};
