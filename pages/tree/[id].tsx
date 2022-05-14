import React from "react";
import { Tree, getTreesFromParent } from "../../lib/trees";
import { Trees } from "../../components/Trees";

type Props = {
  subtrees: Array<Tree>;
};

export default function TreePage({ subtrees }: Props) {
  return <Trees trees={subtrees} />;
}

export async function getServerSideProps({ params }: any) {
  const subtrees = getTreesFromParent(params.id);
  return { props: { subtrees } };
}
