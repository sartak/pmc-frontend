import React from "react";
import { List, ListItem } from "@mui/material";
import { Tree } from "../lib/trees";

type Props = {
  trees: Array<Tree>;
};

export const Trees = ({ trees }: Props) => {
  return (
    <List dense>
      {trees.map((tree) => (
        <ListItem key={tree.id}>
          {tree.label_en || tree.label_ja || tree.label_can}
        </ListItem>
      ))}
    </List>
  );
};
