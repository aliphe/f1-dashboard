import Axios from 'axios';

const WIKI_IMG_REQUEST =
  'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=';

type WikiResponse = {
  query: {
    pages: {
      [pageId: number]: {
        original: {
          source: string;
        };
      };
    };
  };
};

export default async function getWikipediaImageUrl(
  url: string
): Promise<string> {
  const parts = url.split('/');
  const articleName = parts[parts.length - 1];
  const { data } = await Axios.get<WikiResponse>(
    `${WIKI_IMG_REQUEST}${articleName}`
  );
  return Object.values(data.query.pages)[0].original.source;
}
