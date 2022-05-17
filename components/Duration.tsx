import React from "react";

type Props = {
  seconds: number;
};

export const formatDuration = (seconds: number): string => {
  let s: string | number = seconds;
  let sign = "";

  if (s < 0) {
    s = Math.abs(s);
    sign = "-";
  }

  let m: string | number = Math.floor(s / 60);
  s -= m * 60;
  let h: string | number = Math.floor(m / 60);
  m -= h * 60;

  if (s < 10) {
    s = "0" + s;
  }

  if (h) {
    if (m < 10) {
      m = "0" + m;
    }
    return sign + [h, m, s].join(":");
  } else {
    return sign + [m, s].join(":");
  }
};

export const Duration = ({ seconds }: Props) => {
  return <span>{formatDuration(seconds)}</span>;
};
