function formatDate(date) {
  if (!date) {
    return "Data niedostępna";
  }
  const dateObject = new Date(date);
  if (isNaN(dateObject)) {
    return "Błędny format daty";
  }

  const options = { year: "numeric", month: "long", day: "numeric" };
  return dateObject.toLocaleString("pl-PL", options);
}

function formatTime(date) {
  const options = { hour: "numeric", minute: "numeric", second: "numeric" };
  return date.toLocaleString("pl-PL", options);
}

export { formatDate, formatTime };
