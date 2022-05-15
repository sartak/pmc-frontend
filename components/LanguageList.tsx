import React, { useState } from "react";
import {
  Chip,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  TextField,
} from "@mui/material";

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

type InputProps = {
  languages: Array<string>;
  onChange: (languages: Array<string>) => void;
};

const AllLanguages = [
  "en",
  "en/c",
  "en/vi",

  "ja",
  "ja/c",

  "can",
  "can/c",

  "jp&can",

  "ost",
  "?",
  "_",

  "de",
  "es",
  "es/c",
  "fr",
  "fr/vi",
  "it",
  "ko",
  "man",
  "pt",
  "ru",
  "sv",
  "th",
  "yua",
];

export const LanguageListInput = ({ languages, onChange }: InputProps) => {
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
    <Stack direction="row" spacing={1} sx={{ display: "inline-block" }}>
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
          {AllLanguages.map((lang) => (
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
        </MenuList>
      </Menu>
    </Stack>
  );
};
