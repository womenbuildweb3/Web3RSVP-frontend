function formatTimestamp(timestamp) {
  const eventDate = new Date(timestamp * 1);
  const offsetMs = eventDate.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(eventDate.getTime() - offsetMs);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const eventDateStr = `${dateLocal.toLocaleString("en-US", options)}`;
  return eventDateStr;
}

export default formatTimestamp;
