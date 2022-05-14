import React from "react";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import { Link } from "../../components/Link";
import { Media, getMediaFromTree } from "../../lib/media";
import { MediaList } from "../../components/MediaList";
import {
  Tree,
  getAncestors,
  getTree,
  getTreesFromParent,
} from "../../lib/trees";
import { TreeList } from "../../components/TreeList";

type Props = {
  tree: Tree;
  ancestors: Array<Tree>;
  subtrees: Array<Tree>;
  media: Array<Media>;
};

export default function TreePage({ ancestors, tree, subtrees, media }: Props) {
  return (
    <Container sx={{ py: 2 }}>
      <Breadcrumbs>
        <Link href="/" color="inherit">
          PMC
        </Link>
        {ancestors.map((tree) => (
          <Link key={tree.id} href={`/tree/${tree.id}`} color="inherit">
            {tree.label_en || tree.label_ja || tree.label_can}
          </Link>
        ))}
        <Typography color="text.primary">
          {tree.label_en || tree.label_ja || tree.label_can}
        </Typography>
      </Breadcrumbs>
      <TreeList trees={subtrees} />
      <MediaList media={media} />
    </Container>
  );
}

export async function getServerSideProps({ params }: any) {
  const ancestors = getAncestors(params.id);
  const tree = getTree(params.id);
  const subtrees = getTreesFromParent(params.id);
  const media = getMediaFromTree(tree);
  return { props: { ancestors, tree, subtrees, media } };
}
