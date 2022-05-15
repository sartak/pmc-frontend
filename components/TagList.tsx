import React from "react";
import { Chip, Stack } from "@mui/material";

type Props = {
  tags: Array<string>;
};

export const TagList = ({ tags }: Props) => {
  return (
    <Stack direction="row" spacing={1} sx={{ display: "inline-block" }}>
      {tags.map((tag, i) => (
        <Chip key={i} label={tag} />
      ))}
    </Stack>
  );
};
