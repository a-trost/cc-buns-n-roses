const unsplash = require("unsplash-js");

export default function ImageSearch(req, res) {
  const { query } = req;

  const unsplashApi = unsplash.createApi({
    accessKey: "oyPqyizSnzmWSFv4cBwGVtUL9MJxEctrkHNxUJDKxRA",
  });
  unsplashApi.search
    .getPhotos({ query: query.query, perPage: 12 })
    .then((result) => {
      res.status(200).json(result.response.results);
    });
}
