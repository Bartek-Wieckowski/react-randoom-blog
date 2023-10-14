import { createClient } from "contentful";

const contentfulClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export const contentfulContentModel = import.meta.env.VITE_CONTENTFUL_CONTENT_MODEL;

export default contentfulClient;
