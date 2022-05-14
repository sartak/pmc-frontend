import React from "react";
import { Media } from "../lib/media";

type Props = {
  media: Media;
};

const prefix = "http://pmc-mana.shawn.zone/media/";
export const EmbeddedVideo = ({ media }: Props) => {
  const url = `${prefix}${encodeURIComponent(media.path)}`;

  return (
    <video width="100%" controls preload="metadata">
      <source src={url} />
    </video>
  );
};
