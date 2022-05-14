import Link from "next/link";
import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Media } from "../lib/media";
import { formatDuration } from "./Duration";

type Props = {
  media: Array<Media>;
};

export const MediaList = ({ media }: Props) => {
  return (
    <List dense>
      {media.map((media) => (
        <Link key={media.id} href={`/media/${media.id}`}>
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      {media.label_en || media.label_ja || media.label_can}
                    </div>
                    {media.durationSeconds && (
                      <div>
                        <Typography variant="caption">
                          {formatDuration(media.durationSeconds)}
                        </Typography>
                      </div>
                    )}
                  </Box>
                }
                secondary={<React.Fragment>{media.identifier}</React.Fragment>}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};
