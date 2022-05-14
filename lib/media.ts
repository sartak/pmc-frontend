import { Tree } from "./trees";
import { prepare } from "./sql";

export type MediaType = string;
export type Media = {
  id: number;
  type: MediaType;
  treeId: number;
  identifier: string | null;
  label_en: string | null;
  label_ja: string | null;
  label_can: string | null;
  streamable: boolean;
  tags: string;
  sort_order: number | null;
  path: string;
  checksum: string | null;
  materialized_path: string | null;
  spoken_langs: string | null;
  subtitle_langs: string | null;
  durationSeconds: number | null;
  skip1Start: number | null;
  skip1End: number | null;
  skip2Start: number | null;
  skip2End: number | null;
};

export const getMedia = (id: number): Media =>
  prepare("SELECT * FROM media WHERE id=?").get(id);

export const getMediaFromTree = (tree: Tree): Array<Media> =>
  prepare(
    "SELECT * FROM media WHERE treeId=? ORDER BY media.sort_order IS NULL, media.sort_order ASC, media.rowid ASC"
  ).all(tree.id);
