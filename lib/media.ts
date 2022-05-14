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

export const getMediaFromTree = (tree: Tree): Array<Media> => {
  const {
    id,
    join_clause,
    where_clause,
    group_clause,
    order_clause,
    limit_clause,
  } = tree;

  if (
    join_clause ||
    where_clause ||
    group_clause ||
    order_clause ||
    limit_clause
  ) {
    let group = group_clause;
    let distinct = false;

    if (group?.startsWith("*")) {
      group = group.substring(1);
      distinct = true;
    }

    const where = [];
    const bind = [];
    const query = ["SELECT"];
    if (distinct) {
      query.push("DISTINCT(media.id), media.*");
    } else {
      query.push("media.*");
    }
    query.push(
      ", COALESCE(tree_media_sort.identifier, media.identifier) AS identifier"
    );
    query.push("FROM media");

    if (join_clause) {
      query.push(join_clause);
    }

    query.push(
      "LEFT JOIN tree_media_sort ON media.id = tree_media_sort.mediaId AND tree_media_sort.treeId = ?"
    );
    bind.push(String(tree.id));

    if (where_clause) {
      where.push(where_clause);
    }

    if (where.length) {
      query.push("WHERE");
      query.push(where.join(" AND "));
    }

    if (group) {
      query.push("GROUP BY", group);
    }

    query.push("ORDER BY");
    if (order_clause) {
      query.push(order_clause);
    } else {
      const order = [];
      order.push("tree_media_sort.sort_order");
      order.push("media.materialized_path ASC");
      order.push(
        "media.sort_order IS NULL",
        "media.sort_order ASC",
        "media.rowid ASC"
      );

      query.push(order.join(", "));
    }

    if (limit_clause) {
      query.push("LIMIT", limit_clause);
    }

    // TODO: use authentication
    const currentUser = "shawn";
    const sql = query
      .join(" ")
      .replaceAll(/\$CURRENT_USER/g, `'${currentUser}'`);

    console.log(sql, bind);

    return prepare(sql).all(...bind);
  } else {
    return prepare(
      "SELECT * FROM media WHERE treeId=? ORDER BY media.sort_order IS NULL, media.sort_order ASC, media.rowid ASC"
    ).all(id);
  }
};
