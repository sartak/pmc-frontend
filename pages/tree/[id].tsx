import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "../../components/Link";
import {
  Tree,
  getAncestors,
  getTree,
  getTreesFromParent,
} from "../../lib/trees";
import { Trees } from "../../components/Trees";

type Props = {
  tree: Tree;
  ancestors: Array<Tree>;
  subtrees: Array<Tree>;
};

export default function TreePage({ ancestors, tree, subtrees }: Props) {
  return (
    <React.Fragment>
      <Breadcrumbs>
        <Link href="/" color="inherit">
          Top
        </Link>
        {ancestors.map((tree) => (
          <Link key={tree.id} href={`/tree/${tree.id}`} color="inherit">
            {tree.label_en}
          </Link>
        ))}
        <Typography color="text.primary">{tree.label_en}</Typography>
      </Breadcrumbs>
      <Trees trees={subtrees} />
    </React.Fragment>
  );
}

export async function getServerSideProps({ params }: any) {
  const ancestors = getAncestors(params.id);
  const tree = getTree(params.id);
  const subtrees = getTreesFromParent(params.id);
  return { props: { ancestors, tree, subtrees } };
}
