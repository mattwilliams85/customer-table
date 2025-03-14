import { format } from "date-fns";

export const formatDate = (date: string | undefined) => {
  if (!date) return;
  return format(new Date(parseInt(date) * 1000), "MMMM do yyyy, h:mma");
};

export const formatLabel = (label: string) => {
  return label
    .split("_")
    .map((word) => word.toUpperCase())
    .join(" ");
};
