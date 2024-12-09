import axios from "axios";
import { API_URL } from "../const/api.constant";

const BaseService = axios.create({
  timeout: 600000,
  baseURL: API_URL,
});

export default BaseService;
