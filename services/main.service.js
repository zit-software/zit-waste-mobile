import axios from "axios";
const BASE_URL = "http://localhost:8000/wastes";
export default {
  getLabels() {
    return axios.get(`${BASE_URL}/labels`);
  },
  predict(report) {
    return axios.post(`${BASE_URL}/report`, report);
  },
  detect(image) {
    const form = new FormData();
    form.append("img", image);
    return axios.post(`${BASE_URL}/detectection`, image);
  },
};
