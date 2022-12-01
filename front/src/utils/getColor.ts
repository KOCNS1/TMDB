export const getColor = (value: number) => {
  if (value >= 7 && value <= 10) return "rgb(22 163 74)";
  else if (value >= 4 && value <= 7) return "rgb(202 138 4)";
  else if (value >= 0 && value <= 4) return "rgb(220 38 38)";
  else return "rgb(22 163 74)";
};
