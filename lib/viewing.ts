import { prepare } from "./sql";

export type Viewing = {
  rowid: number;
  mediaId: number;
  startTime: number | null;
  endTime: number | null;
  initialSeconds: number | null;
  elapsedSeconds: number | null;
  audioTrack: number | null;
  location: string | null;
  who: string | null;
  completed: boolean;
  metadata: string | null;
};

export const getViewing = (id: number): Viewing =>
  prepare("SELECT * FROM viewing WHERE id=?").get(id);

export const getViewingsForMedia = (mediaId: number): Array<Viewing> =>
  prepare("SELECT * FROM viewing WHERE mediaId=? ORDER BY rowid ASC").all(
    mediaId
  );
