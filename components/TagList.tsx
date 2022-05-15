import React, { useState } from "react";
import { Chip, Stack, TextField } from "@mui/material";

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

type InputProps = {
  tags: Array<string>;
  onChange: (tags: Array<string>) => void;
};

export const TagListInput = ({ tags, onChange }: InputProps) => {
  const [addingTag, setAddingTag] = useState<string | null>(null);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ display: "inline-flex", alignItems: "center", height: "25px" }}
    >
      {tags.map((tag, i) => (
        <Chip
          key={i}
          size="medium"
          label={tag}
          onDelete={() => onChange(tags.filter((_, j) => i !== j))}
        />
      ))}
      {addingTag === null ? (
        <Chip
          variant="outlined"
          label="add tag"
          onClick={() => setAddingTag("")}
        />
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
