import { prepare } from "./sql";

export type Tree = {
  id: number;
  parentId: number;
  label_en: string | null;
  label_ja: string | null;
  label_can: string | null;
  color: string | null;
  join_clause: string | null;
  where_clause: string | null;
  group_clause: string | null;
  order_clause: string | null;
  limit_clause: string | null;
  sort_order: number | null;
  media_tags: string;
  materialized_path: string;
  default_language: string | null;
};

export const getTree = (id: number): Tree =>
  prepare("SELECT * FROM tree WHERE id=?").get(id);

export const getAllTrees = (): Array<Tree> =>
  prepare("SELECT * FROM tree ORDER BY materialized_path ASC").all();

export const getTreesFromParent = (parentId: number): Array<Tree> =>
  prepare(
    "SELECT * FROM tree WHERE parentId=? ORDER BY sort_order IS NULL, sort_order ASC, id ASC"
  ).all(parentId);

export const getAncestors = (id: number): Array<Tree> =>
  prepare(`
    WITH RECURSIVE parent_tree(n) AS (
      VALUES(?)
      UNION
      SELECT parentId FROM tree, parent_tree
        WHERE tree.id = parent_tree.n
    )
    SELECT * FROM tree
    WHERE tree.id IN parent_tree
    AND tree.id != ?
    ORDER BY tree.materialized_path ASC
  `).all(id, id);
