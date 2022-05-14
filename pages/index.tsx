import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { Tree, getTreesFromParent } from "../lib/trees";
import { Trees } from "../components/Trees";

type Props = {
  trees: Array<Tree>;
};

export default function Home({ trees }: Props) {
  return (
    <React.Fragment>
      <Breadcrumbs>
        <Typography color="text.primary">Top</Typography>
      </Breadcrumbs>
      <Trees trees={trees} />
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  const trees = getTreesFromParent(0);
  return { props: { trees } };
}
