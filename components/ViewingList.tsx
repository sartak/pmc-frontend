import React from "react";
import { LanguageList } from "./LanguageList";
import { List, ListItem, ListItemText, Stack } from "@mui/material";
import { Media } from "../lib/media";
import { Time } from "./Time";
import { Viewing } from "../lib/viewing";
import { formatDuration } from "./Duration";

type Props = {
  media: Media;
  viewings: Array<Viewing>;
};

const ViewingDuration = ({
  initialSeconds,
  elapsedSeconds,
  completed,
}: {
  initialSeconds: number | null;
  elapsedSeconds: number | null;
  completed: boolean;
}) => {
  const components = [];

  if (initialSeconds !== null && initialSeconds > 0) {
    components.push("from", formatDuration(initialSeconds));
    if (completed) {
      components.push("to end");
    } else if (elapsedSeconds !== null) {
      components.push("to", formatDuration(initialSeconds + elapsedSeconds));
    } else {
      components.push("to", "unknown");
    }
  } else {
    if (completed) {
      components.push("all");
    } else if (elapsedSeconds !== null) {
      components.push(formatDuration(elapsedSeconds));
    } else {
      components.push("unknown duration");
    }
  }

  return <span>{components.join(" ")}</span>;
};

export const ViewingList = ({ media, viewings }: Props) => {
  const spoken_langs = media.spoken_langs?.split(",");

  return (
    <List dense>
      {viewings.map((viewing) => {
        const language =
          viewing.audioTrack !== null && spoken_langs?.[viewing.audioTrack];
        return (
          <ListItem key={viewing.rowid}>
            <ListItemText
              primary={
                <Stack direction="row" spacing={1}>
                  {viewing.startTime !== null && (
                    <Time date={new Date(viewing.startTime * 1000)} />
                  )}
                  {language && (
                    <LanguageList
                      kind="spoken_langs"
                      languages={[language]}
                      size="small"
                    />
                  )}
                </Stack>
              }
              secondary={
                <React.Fragment>
                  {media.type === "game" ? "Played" : "Watched"}{" "}
                  <ViewingDuration
                    initialSeconds={viewing.initialSeconds}
                    elapsedSeconds={viewing.elapsedSeconds}
                    completed={viewing.completed}
                  />{" "}
                  {viewing.location !== null && (
                    <React.Fragment>({viewing.location})</React.Fragment>
                  )}
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};
