import React from "react";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import { Link } from "../../components/Link";
import { Media, getMedia } from "../../lib/media";
import { MediaMetadata } from "../../components/MediaMetadata";
import { Tree, getAncestors, getTree } from "../../lib/trees";
import { Viewing, getViewingsForMedia } from "../../lib/viewing";
import { ViewingList } from "../../components/ViewingList";

type Props = {
  ancestors: Array<Tree>;
  media: Media;
  viewings: Array<Viewing>;
};

export default function TreePage({ ancestors, media, viewings }: Props) {
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
          {media.label_en || media.label_ja || media.label_can}
        </Typography>
      </Breadcrumbs>
      <Container maxWidth="md" sx={{ py: 2 }}>
        <MediaMetadata media={media} />
        <ViewingList viewings={viewings} media={media} />
      </Container>
    </Container>
  );
}

export async function getServerSideProps({ params }: any) {
  const media = getMedia(params.id);
  const tree = getTree(media.treeId);
  const ancestors = getAncestors(tree.id);
  const viewings = getViewingsForMedia(params.id);
  return { props: { ancestors: [...ancestors, tree], media, viewings } };
}
