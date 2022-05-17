import React, { useState } from "react";
import useSWR from "swr";
import {
  Chip,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type Props = {
  languages: Array<string>;
  kind: "spoken_langs" | "subtitle_langs";
  size?: "small" | "medium";
};

export const LanguageList = ({ languages, size }: Props) => {
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

type InputProps = {
  languages: Array<string>;
  kind: "spoken_langs" | "subtitle_langs";
  onChange: (languages: Array<string>) => void;
};

export const LanguageListInput = ({
  languages,
  kind,
  onChange,
}: InputProps) => {
  const { data, error } = useSWR(
    kind === "spoken_langs" ? "/api/spoken_langs" : "/api/subtitle_langs"
  );

  let allLangs: Array<string> = data
    ? data.langs.filter(
        (lang: string) => !lang.startsWith("?/") && !lang.startsWith("??")
      )
    : [];

  allLangs = Array.from(new Set(["en", "ja", "can", ...allLangs]));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    setActiveIndex(null);
  };
  const [manualEdit, setManualEdit] = useState<string>("??");

  if (languages.length === 1 && languages[0] === "??") {
    return (
      <TextField
        value={manualEdit}
        onChange={(e) => setManualEdit(e.target.value)}
        onBlur={() => {
          onChange(manualEdit.split(","));
        }}
      />
    );
  }

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
      {languages.map((language, i) => (
        <Chip
          key={i}
          label={language || "(none)"}
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
            setActiveIndex(i);
          }}
        />
      ))}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { maxHeight: "200px" } }}
      >
        <MenuList dense>
          {data &&
            allLangs.map((lang) => (
              <MenuItem
                key={lang}
                onClick={() => {
                  onChange(
                    languages.map((l, j) => (activeIndex === j ? lang : l))
                  );
                  handleClose();
                }}
              >
                {lang}
              </MenuItem>
            ))}
          {!data && error && (
            <MenuItem>
              <Typography color="error.main">{error.toString()}</Typography>
            </MenuItem>
          )}
          {!data && !error && (
            <MenuItem>
              <Typography fontWeight="light">Loading…</Typography>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Stack>
  );
};
