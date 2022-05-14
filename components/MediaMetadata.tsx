import React from "react";
import { Chip, Divider, Stack } from "@mui/material";
import { Duration } from "./Duration";
import { LanguageList } from "./LanguageList";
import { Media } from "../lib/media";
import { Skip } from "./Skip";
import { TagList } from "./TagList";

type Props = {
  media: Media;
};

export const calculateTrueDuration = (media: Media): number | null => {
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

export const MediaMetadata = ({ media }: Props) => {
  const tags = Array.from(
    new Set(media.tags.split("`").filter((tag) => /\S/.test(tag)))
  );
  const spoken_langs = Array.from(
    new Set(media.spoken_langs?.split(",").filter((tag) => /\S/.test(tag)))
  );
  const subtitle_langs = Array.from(
    new Set(media.subtitle_langs?.split(",").filter((tag) => /\S/.test(tag)))
  );
  const true_duration = calculateTrueDuration(media);

  return (
    <ul>
      {media.identifier !== null && <li>identifier: {media.identifier}</li>}
      <li>
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: "inline-flex" }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {[
            [media.label_en, "label_en"],
            [media.label_ja, "label_ja"],
            [media.label_can, "label_can"],
          ]
            .filter(([label]) => label !== null)
            .map(([label, lang]) => (
              <span key={lang}>{label}</span>
            ))}
        </Stack>
      </li>
      <li>
        {media.streamable ? (
          <Chip sx={{ mr: 1 }} label="streamable" />
        ) : (
          <Chip sx={{ mr: 1 }} label="unstreamable" color="warning" />
        )}
        <TagList tags={tags} />
      </li>
      <li>path: {media.path}</li>
      {spoken_langs.length > 0 && (
        <li>
          spoken_langs: <LanguageList languages={spoken_langs} />
        </li>
      )}
      {subtitle_langs.length > 0 && (
        <li>
          subtitle_langs: <LanguageList languages={subtitle_langs} />
        </li>
      )}
      <li>
        duration:{" "}
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
      </li>
    </ul>
  );
};
