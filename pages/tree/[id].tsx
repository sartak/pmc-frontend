import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
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
      <TreeList trees={subtrees} />
      <MediaList media={media} />
    </React.Fragment>
  );
}

export async function getServerSideProps({ params }: any) {
  const ancestors = getAncestors(params.id);
  const tree = getTree(params.id);
  const subtrees = getTreesFromParent(params.id);
  const media = getMediaFromTree(params.id);
  return { props: { ancestors, tree, subtrees, media } };
}
