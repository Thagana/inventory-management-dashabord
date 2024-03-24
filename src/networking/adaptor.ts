import axios from "axios";

const instance = axios.create({
  validateStatus: (status) => {
    let correct = false;
    if (status >= 200 && status < 300) {
      correct = true;
    } else if (
      status === 401 ||
      status === 400 ||
      status === 503 ||
      status === 422
    ) {
      correct = true;
    }
    return correct;
  },
});

export default instance;
