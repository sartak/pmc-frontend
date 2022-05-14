import React from "react";
import { formatDuration } from "./Duration";

type Props = {
  start: number | null;
  end: number | null;
};

export const Skip = ({ start, end }: Props) => {
  return (
    <span>
      (skip {start === null ? "start" : formatDuration(start)} to{" "}
      {end === null ? "end" : formatDuration(end)})
    </span>
  );
};
