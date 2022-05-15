import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { Media } from "../lib/media";
import { MediaMetadataEdit } from "./MediaMetadataEdit";
import { MediaMetadataView } from "./MediaMetadataView";
import { Tree } from "../lib/trees";

type Props = {
  media: Media;
  ancestors: Array<Tree>;
};

export const MediaMetadata = (props: Props) => {
  const [media, setMedia] = useState(props.media);
  const [editing, setEditing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);

  return (
    <Card>
      <CardHeader
        title={
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "inline-flex" }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {[
              [media.label_en, "label_en"],
              [media.label_ja, "label_ja"],
              [media.label_can, "label_can"],
            ]
              .filter(([label]) => label !== null && label !== "")
              .map(([label, lang]) => (
                <span key={lang}>{label}</span>
              ))}
          </Stack>
        }
        action={
          !editing && (
            <div>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setEditing(true);
                  }}
                >
                  Edit
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>Play in Office</MenuItem>
                <MenuItem onClick={handleClose}>Play in Living Room</MenuItem>
              </Menu>
            </div>
          )
        }
      />
      {editing ? (
        <MediaMetadataEdit
          media={media}
          ancestors={props.ancestors}
          onChange={(field, value) => setMedia({ ...media, [field]: value })}
          onReset={() => setMedia(props.media)}
        />
      ) : (
        <MediaMetadataView media={media} />
      )}
    </Card>
  );
};
