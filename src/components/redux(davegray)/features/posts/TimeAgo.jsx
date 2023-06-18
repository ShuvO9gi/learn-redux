import { formatDistanceToNow, parseISO } from "date-fns";

const TimeAgo = ({ timestamp }) => {
  let timeago = "";
  if (timestamp) {
    const date = parseISO(timestamp); //Parse the given string in ISO 8601 format and return an instance of Date.
    const timePeriod = formatDistanceToNow(date); //Return the distance between the given date and now in words.(ex. less than a minute)
    timeago = `${timePeriod} ago`;
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeago}</i>
    </span>
  );
};

export default TimeAgo;

//<span title={work as tooltip to show exact date}
//A (nbsp)non-breaking space is a space that will not break into a new line.
