import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-9b449-default-rtdb.europe-west1.firebasedatabase.app"
});

export default instance;