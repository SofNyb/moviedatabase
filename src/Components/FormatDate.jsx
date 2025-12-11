const FormatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();

  const suffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${month} ${day}${suffix(day)}, ${year}`;
};

export const ExtractYear = (dateValue) => {
  if (!dateValue) return null;

  const str = String(dateValue);

  // Handle "31 Jul 2004" format - take last part
  if (str.includes(" ")) {
    return str.split(" ").pop();
  }

  // Handle "2004-05-15" or "2004" format - take first part
  return str.split("-")[0];
};

export default FormatDate;
