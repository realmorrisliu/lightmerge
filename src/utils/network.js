import axios from 'axios';

const makeAPI = api => `/api${api}`;
const Get = (url, reqestBody) => (
  axios
    .get(
      makeAPI(url),
      { params: reqestBody },
    )
    .then(result => result.data)
);
const Post = (url, reqestBody) => (
  axios
    .post(
      makeAPI(url),
      reqestBody,
    )
    .then(result => result.data)
);

export { Get, Post };
