import axios from 'axios';
import io from 'socket.io';

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

const Socket = io('//localhost:9002');

export { Get, Post, Socket };
