export const formatHour = (hour) => {
  var [hours, minutes] = hour.split(":");
  const meridian = hours >= 12 ? "p.m." : "a.m.";
  hours = hours % 12 ? hours % 12 : 12;
  return `${hours}:${minutes} ${meridian}`;
};

export const unFormatHour = (hour) => {
  var [time, meridian] = hour.split(" ");
  var [hours, minutes] = time.split(":");
  hours =
    meridian == "p.m."
      ? hours % 12
        ? `${parseInt(hours) + 12}`
        : "00"
      : hours < 10
      ? `0${hours}`
      : hours;
  return `${hours}:${minutes}`;
};
