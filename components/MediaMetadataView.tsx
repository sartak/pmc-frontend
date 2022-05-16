import React from "react";
import { Duration } from "./Duration";
import { LanguageList } from "./LanguageList";
import { Media } from "../lib/media";
import { PropList, PropListItem } from "./PropList";
import { Skip } from "./Skip";
import { Stack } from "@mui/material";
import { TagList } from "./TagList";

type Props = {
  media: Media;
};

const calculateTrueDuration = (media: Media): number | null => {
  const { durationSeconds } = media;
  if (durationSeconds === null) {
    return durationSeconds;
  }

  let seconds = durationSeconds;

  [
    [media.skip1Start, media.skip1End],
    [media.skip2Start, media.skip2End],
  ].forEach(([start, end]) => {
    if (start !== null && end !== null) {
      seconds -= end - start;
    } else if (end !== null) {
      seconds -= end;
    } else if (start !== null) {
      seconds -= durationSeconds - start;
    }
  });

  return seconds;
};

export const MediaMetadataView = ({ media }: Props) => {
  const tags = Array.from(
    new Set(media.tags.split("`").filter((tag) => /\S/.test(tag)))
  );
  const spoken_langs = Array.from(
    new Set(
      media.spoken_langs
        ?.split(",")
        .filter((tag) => /\S/.test(tag))
        .filter((tag) => tag !== "_")
    )
  );
  const subtitle_langs = Array.from(
    new Set(
      media.subtitle_langs
        ?.split(",")
        .filter((tag) => /\S/.test(tag))
        .filter((tag) => tag !== "_")
    )
  );
  const true_duration = calculateTrueDuration(media);

  return (
    <PropList>
      {media.identifier !== null && (
        <PropListItem label="Identifier" value={media.identifier} />
      )}
      <PropListItem
        value={<TagList streamable={!!media.streamable} tags={tags} />}
      />
      <PropListItem label="Path" value={media.path} />
      {spoken_langs.length > 0 && (
        <PropListItem
          label="Spoken langs"
          value={<LanguageList type="spoken_langs" languages={spoken_langs} />}
        />
      )}
      {subtitle_langs.length > 0 && (
        <PropListItem
          label="Subtitle langs"
          value={
            <LanguageList type="subtitle_langs" languages={subtitle_langs} />
          }
        />
      )}
      {media.type === "video" && (
        <PropListItem
          label="Duration"
          value={
            <Stack direction="row" spacing={1} sx={{ display: "inline-block" }}>
              {media.durationSeconds === null ? (
                <span>unknown</span>
              ) : (
                <Duration seconds={media.durationSeconds} />
              )}
              {(media.skip1Start !== null || media.skip1End !== null) && (
                <Skip start={media.skip1Start} end={media.skip1End} />
              )}
              {(media.skip2Start !== null || media.skip2End !== null) && (
                <Skip start={media.skip2Start} end={media.skip2End} />
              )}
              {true_duration !== null &&
                (media.skip1Start !== null ||
                  media.skip1End !== null ||
                  media.skip2Start !== null ||
                  media.skip2End !== null) && (
                  <span>
                    → <Duration seconds={true_duration} />
                  </span>
                )}
            </Stack>
          }
        />
      )}
    </PropList>
  );
};
