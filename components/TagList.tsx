import React, { useState } from "react";
import { Box, Chip, Stack, TextField } from "@mui/material";

type Props = {
  tags: Array<string>;
  streamable?: boolean;
};

export const TagList = ({ tags, streamable }: Props) => {
  return (
    <Stack
      direction="row"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        flexWrap: "wrap",
        columnGap: "4px",
        rowGap: "4px",
      }}
    >
      {streamable === true && <Chip label="streamable" />}
      {streamable === false && <Chip label="unstreamable" color="warning" />}
      {tags.map((tag, i) => (
        <Chip key={i} label={tag} />
      ))}
    </Stack>
  );
};

type InputProps = {
  tags: Array<string>;
  onChange: (tags: Array<string>) => void;
};

export const TagListInput = ({ tags, onChange }: InputProps) => {
  const [addingTag, setAddingTag] = useState<string | null>(null);

  return (
    <Stack
      direction="row"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        flexWrap: "wrap",
        columnGap: "4px",
        rowGap: "4px",
      }}
    >
      {tags.map((tag, i) => (
        <Box key={i} sx={{ height: "40px" }} display="flex" alignItems="center">
          <Chip
            size="medium"
            label={tag}
            onDelete={() => onChange(tags.filter((_, j) => i !== j))}
          />
        </Box>
      ))}
      {addingTag === null ? (
        <Box
          sx={{ height: "40px", mr: "125px" }}
          display="flex"
          alignItems="center"
        >
          <Chip
            variant="outlined"
            label="add tag"
            onClick={() => setAddingTag("")}
          />
        </Box>
      ) : (
        <TextField
          hiddenLabel
          autoFocus
          size="small"
          value={addingTag}
          onChange={(e) => setAddingTag(e.target.value)}
          onBlur={() => {
            if (addingTag !== "") {
              onChange([...tags, addingTag]);
            }
            setAddingTag(null);
          }}
        />
      )}
    </Stack>
  );
};
