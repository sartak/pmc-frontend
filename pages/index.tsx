import React from "react";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import { Tree, getTreesFromParent } from "../lib/trees";
import { TreeList } from "../components/TreeList";

type Props = {
  trees: Array<Tree>;
};

export default function Home({ trees }: Props) {
  return (
    <Container sx={{ py: 2 }}>
      <Breadcrumbs>
        <Typography color="text.primary">PMC</Typography>
      </Breadcrumbs>
      <TreeList trees={trees} />
    </Container>
  );
}

export async function getServerSideProps() {
  const trees = getTreesFromParent(0);
  return { props: { trees } };
}
