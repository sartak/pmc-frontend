import React from "react";

type Props = {
  date: Date;
};

export const Time = ({ date }: Props) => {
  return (
    <span>
      {date.toLocaleString("en-US", { timeZone: "America/New_York" })}
    </span>
  );
};
