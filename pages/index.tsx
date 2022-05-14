import { Tree, getTreesFromParent } from "../lib/trees";
import { Trees } from "../components/Trees";

type Props = {
  trees: Array<Tree>;
};

export default function Home({ trees }: Props) {
  return <Trees trees={trees} />;
}

export async function getServerSideProps() {
  const trees = getTreesFromParent(0);
  return { props: { trees } };
}
