const local = {
  api_url: "http://localhost:5000",
  frontend_url: "http://127.0.0.1:3000",
};

const prod = {
  api_url: "https://app-video-stream-backend.herokuapp.com",
  frontend_url: "https://app-video-stream-frontend.herokuapp.com/",
};

const config = process.env.REACT_APP_STAGE === "production" ? prod : local;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
