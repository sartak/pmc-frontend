import Link from "next/link";
import React from "react";
import { List, ListItem, ListItemButton } from "@mui/material";
import { Tree } from "../lib/trees";

type Props = {
  trees: Array<Tree>;
};

export const Trees = ({ trees }: Props) => {
  return (
    <List dense>
      {trees.map((tree) => (
        <Link key={tree.id} href={`/tree/${tree.id}`}>
          <ListItem>
            <ListItemButton>
              {tree.label_en || tree.label_ja || tree.label_can}
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};
