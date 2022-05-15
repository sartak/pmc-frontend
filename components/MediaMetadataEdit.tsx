import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { LanguageListInput } from "./LanguageList";
import { Media } from "../lib/media";
import { TagListInput } from "./TagList";
import { Tree } from "../lib/trees";

type Props = {
  media: Media;
  ancestors: Array<Tree>;
  onChange: (field: string, value: string | boolean) => void;
  onReset: () => void;
};

export const MediaMetadataEdit = ({
  media,
  ancestors,
  onChange,
  onReset,
}: Props) => {
  const [changed, setChanged] = useState<boolean>(false);
  const change = (field: string) => (e: any) => {
    setChanged(true);
    onChange(field, e.target.value);
  };

  const tags = Array.from(
    new Set(media.tags.split("`").filter((tag) => /\S/.test(tag)))
  );
  const spoken_langs = media.spoken_langs?.split(",");
  const subtitle_langs = media.subtitle_langs?.split(",");

  const pathError = !media.path.length;
  const error = pathError;

  const saveButton = (
    <Button
      disabled={!changed}
      variant="contained"
      color={error ? "error" : "primary"}
    >
      Save
    </Button>
  );

  return (
    <Stack spacing={2} sx={{ m: 2 }} alignItems="flex-start">
      <TextField
        label="label_en"
        value={media.label_en ?? ""}
        fullWidth
        onChange={change("label_en")}
      />
      <TextField
        label="label_ja"
        value={media.label_ja ?? ""}
        fullWidth
        onChange={change("label_ja")}
      />
      <TextField
        label="label_can"
        value={media.label_can ?? ""}
        fullWidth
        onChange={change("label_can")}
      />
      <FormControl fullWidth>
        <InputLabel id="media-type-label">type</InputLabel>
        <Select
          value={media.type}
          labelId="media-type-label"
          id="media-type-select"
          label="type"
          disabled
        >
          {["video", "stream", "game"].map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="media-tree-label">tree</InputLabel>
        <Select
          value="x"
          labelId="media-tree-label"
          id="media-tree-select"
          label="tree"
          disabled
        >
          <MenuItem value="x">
            <Stack spacing={1} direction="row">
              {ancestors.map((tree, t) => (
                <React.Fragment key={tree.id}>
                  {t > 0 && <Divider orientation="vertical" flexItem />}
                  <span>
                    {tree.label_en || tree.label_ja || tree.label_can}
                  </span>
                </React.Fragment>
              ))}
            </Stack>
          </MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="identifier"
        value={media.identifier ?? ""}
        fullWidth
        onChange={change("identifier")}
      />
      <TextField
        label="path"
        required
        error={pathError}
        value={media.path ?? ""}
        fullWidth
        onChange={change("path")}
      />
      <TextField
        label="sort_order"
        value={media.sort_order ?? ""}
        fullWidth
        onChange={change("sort_order")}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={media.streamable}
            onChange={(e) => {
              setChanged(true);
              onChange("streamable", e.target.checked);
            }}
          />
        }
        label="Streamable"
      />
      <Stack direction="row" spacing={1} display="flex" alignItems="center">
        <span>tags</span>
        <TagListInput
          tags={tags}
          onChange={(tags) => {
            setChanged(true);
            onChange("tags", "`" + tags.join("`") + "`");
          }}
        />
      </Stack>
      <Stack direction="row" spacing={1} display="flex" alignItems="center">
        <span>spoken_langs</span>
        <LanguageListInput
          languages={spoken_langs || []}
          onChange={(langs) => {
            setChanged(true);
            onChange("spoken_langs", langs.join(","));
          }}
        />
      </Stack>
      {!media.subtitle_langs?.length || (
        <Stack direction="row" spacing={1} display="flex" alignItems="center">
          <span>subtitle_langs</span>
          <LanguageListInput
            languages={subtitle_langs || []}
            onChange={(langs) => {
              setChanged(true);
              onChange("subtitle_langs", langs.join(","));
            }}
          />
        </Stack>
      )}
      {media.type === "video" && (
        <React.Fragment>
          <Stack direction="row" spacing={1}>
            <TextField
              label="skip 1 start"
              value={media.skip1Start ?? ""}
              fullWidth
              onChange={change("skip1Start")}
            />
            <TextField
              label="skip 1 end"
              value={media.skip1End ?? ""}
              fullWidth
              onChange={change("skip1End")}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <TextField
              label="skip 2 start"
              value={media.skip2Start ?? ""}
              fullWidth
              onChange={change("skip2Start")}
            />
            <TextField
              label="skip 2 end"
              value={media.skip2End ?? ""}
              fullWidth
              onChange={change("skip2End")}
            />
          </Stack>
        </React.Fragment>
      )}
      <Stack direction="row" spacing={1}>
        {error ? (
          <Tooltip arrow title={pathError ? "path is required" : ""}>
            {saveButton}
          </Tooltip>
        ) : (
          saveButton
        )}
        <Button
          disabled={!changed}
          variant="contained"
          onClick={() => {
            setChanged(false);
            onReset();
          }}
        >
          Reset
        </Button>
      </Stack>
    </Stack>
  );
};
