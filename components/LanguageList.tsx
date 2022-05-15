import React from "react";
import { Chip, Stack } from "@mui/material";

type Props = {
  languages: Array<string>;
  size?: "small" | "medium";
};

export const LanguageList = ({ languages, size }: Props) => {
  return (
    <Stack direction="row" spacing={1} sx={{ display: "inline-block" }}>
      {languages.map((language, i) => (
        <Chip
          key={i}
          label={language}
          variant={language.startsWith("?") ? "outlined" : "filled"}
          size={size}
        />
      ))}
    </Stack>
  );
};
