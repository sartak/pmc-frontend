import Link from "next/link";
import React from "react";
import { List, ListItem, ListItemButton } from "@mui/material";
import { Media } from "../lib/media";

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
              {media.label_en || media.label_ja || media.label_can}
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};
