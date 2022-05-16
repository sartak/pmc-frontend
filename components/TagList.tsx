import React, { useState } from "react";
import useSWR from "swr";
import { Autocomplete, Box, Chip, Stack, TextField } from "@mui/material";

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
  const { data, error } = useSWR("/api/tags");
  const allTags: Array<string> = data ? data.tags : [];

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
        <Autocomplete
          options={allTags}
          size="small"
          onChange={(_e, value) => {
            if (value !== "" && value !== null) {
              onChange([...tags, value]);
            }
            setAddingTag(null);
          }}
          onBlur={() => {
            if (addingTag !== "" && addingTag !== null) {
              onChange([...tags, addingTag]);
            }
            setAddingTag(null);
          }}
          loading={!data && !error}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ width: 200 }}
              hiddenLabel
              autoFocus
              label="add tag"
              size="small"
              error={!!error}
              helperText={error?.toString()}
              value={addingTag}
              onChange={(e) => setAddingTag(e.target.value)}
            />
          )}
        />
      )}
    </Stack>
  );
};
