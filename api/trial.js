import axios from "axios";
import {inputJsonStream} from "./utils/jsonStream.js";

const url =
  "https://livetiming.formula1.com/static/2021/2021-07-18_British_Grand_Prix/2021-07-18_Race/Position.z.jsonStream";

const fetchDataFromAPI = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

console.log(
  inputJsonStream(
    "https://livetiming.formula1.com/static/2021/2021-07-18_British_Grand_Prix/2021-07-18_Race/TimingData.jsonStream"
  )
);
