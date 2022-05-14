import React from "react";
import { Chip, Divider, Stack } from "@mui/material";
import { Duration } from "./Duration";
import { LanguageList } from "./LanguageList";
import { Media } from "../lib/media";
import { TagList } from "./TagList";

type Props = {
  media: Media;
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
        {media.durationSeconds === null ? (
          "unknown"
        ) : (
          <Duration seconds={media.durationSeconds} />
        )}
      </li>
    </ul>
  );
};
