import { Client } from "../prismic-configuration";
import SliceZone from "next-slicezone";
import { useGetStaticProps } from "next-slicezone/hooks";

import resolver from "../sm-resolver.js";

const Page = (props) => <SliceZone {...props} resolver={resolver} />;

// Fetch content from Prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  uid: () => "home",
});

export default Page;
