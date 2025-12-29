// Calculates the number of days since the passed date.
export const daysSince = (pastDateString) => {
  // 1. Create Date objects for the past date and today
  const pastDate = new Date(pastDateString);
  const today = new Date();

  // Ensure dates are valid
  if (isNaN(pastDate.getTime()) || isNaN(today.getTime())) {
    return "Invalid date provided";
  }

  // To avoid issues with Daylight Saving Time (DST) and timezones,
  // it is best to set both dates to midnight UTC before comparison.
  const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const utcPastDate = Date.UTC(pastDate.getFullYear(), pastDate.getMonth(), pastDate.getDate());

  // 2. Calculate the difference in milliseconds
  const millisecondsSince = utcToday - utcPastDate;

  // 3. Define the number of milliseconds in a day (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const millisecondsPerDay = 1000 * 60 * 60 * 24; // 86400000

  // 4. Convert the milliseconds difference to days and round down to the nearest whole day
  const daysPassed = Math.floor(millisecondsSince / millisecondsPerDay);

  return daysPassed;
}
