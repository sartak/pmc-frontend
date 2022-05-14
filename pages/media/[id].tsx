import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "../../components/Link";
import { Media, getMedia } from "../../lib/media";
import { Tree, getAncestors, getTree } from "../../lib/trees";

type Props = {
  ancestors: Array<Tree>;
  media: Media;
};

export default function TreePage({ ancestors, media }: Props) {
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
        <Typography color="text.primary">{media.label_en}</Typography>
      </Breadcrumbs>
    </React.Fragment>
  );
}

export async function getServerSideProps({ params }: any) {
  const media = getMedia(params.id);
  const tree = getTree(media.treeId);
  const ancestors = getAncestors(tree.id);
  return { props: { ancestors: [...ancestors, tree], media } };
}
