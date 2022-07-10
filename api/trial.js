import axios from "axios";
import { inputJsonStream } from "./utils/jsonStream";

const url =
  "https://livetiming.formula1.com/static/2021/2021-07-18_British_Grand_Prix/2021-07-18_Race/Position.z.jsonStream";

const fetchDataFromAPI = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
const here = {
  Series: [
    { Utc: "2021-07-18T13:01:05.071Z", Lap: 1 },
    { Utc: "2021-07-18T14:05:25.49Z", Lap: 2 },
    { Utc: "2021-07-18T14:08:04.52Z", Lap: 3 },
    { Utc: "2021-07-18T14:45:11.634Z", Lap: 4 },
    { Utc: "2021-07-18T14:47:51.817Z", Lap: 5 },
    { Utc: "2021-07-18T14:49:24.623Z", Lap: 6 },
    { Utc: "2021-07-18T14:50:57.526Z", Lap: 7 },
    { Utc: "2021-07-18T14:52:30.514Z", Lap: 8 },
    { Utc: "2021-07-18T14:54:03.633Z", Lap: 9 },
    { Utc: "2021-07-18T14:55:36.594Z", Lap: 10 },
    { Utc: "2021-07-18T14:57:09.856Z", Lap: 11 },
    { Utc: "2021-07-18T14:58:42.678Z", Lap: 12 },
    { Utc: "2021-07-18T15:00:15.598Z", Lap: 13 },
    { Utc: "2021-07-18T15:01:48.552Z", Lap: 14 },
    { Utc: "2021-07-18T15:03:21.31Z", Lap: 15 },
    { Utc: "2021-07-18T15:04:54.584Z", Lap: 16 },
    { Utc: "2021-07-18T15:06:27.231Z", Lap: 17 },
    { Utc: "2021-07-18T15:07:59.682Z", Lap: 18 },
    { Utc: "2021-07-18T15:09:31.973Z", Lap: 19 },
    { Utc: "2021-07-18T15:11:04.002Z", Lap: 20 },
    { Utc: "2021-07-18T15:12:36.119Z", Lap: 21 },
    { Utc: "2021-07-18T15:14:08.078Z", Lap: 22 },
    { Utc: "2021-07-18T15:15:40.291Z", Lap: 23 },
    { Utc: "2021-07-18T15:17:12.576Z", Lap: 24 },
    { Utc: "2021-07-18T15:18:44.888Z", Lap: 25 },
    { Utc: "2021-07-18T15:20:16.883Z", Lap: 26 },
    { Utc: "2021-07-18T15:21:48.893Z", Lap: 27 },
    { Utc: "2021-07-18T15:23:20.969Z", Lap: 28 },
    { Utc: "2021-07-18T15:24:52.935Z", Lap: 29 },
    { Utc: "2021-07-18T15:26:24.76Z", Lap: 30 },
    { Utc: "2021-07-18T15:28:16.479Z", Lap: 31 },
    { Utc: "2021-07-18T15:29:48.062Z", Lap: 32 },
    { Utc: "2021-07-18T15:31:19.589Z", Lap: 33 },
    { Utc: "2021-07-18T15:32:51.283Z", Lap: 34 },
    { Utc: "2021-07-18T15:34:23.272Z", Lap: 35 },
    { Utc: "2021-07-18T15:35:54.744Z", Lap: 36 },
    { Utc: "2021-07-18T15:37:26.16Z", Lap: 37 },
    { Utc: "2021-07-18T15:38:57.609Z", Lap: 38 },
    { Utc: "2021-07-18T15:40:29.158Z", Lap: 39 },
    { Utc: "2021-07-18T15:42:00.77Z", Lap: 40 },
    { Utc: "2021-07-18T15:43:32.192Z", Lap: 41 },
    { Utc: "2021-07-18T15:45:03.72Z", Lap: 42 },
    { Utc: "2021-07-18T15:46:34.981Z", Lap: 43 },
    { Utc: "2021-07-18T15:48:05.927Z", Lap: 44 },
    { Utc: "2021-07-18T15:49:36.767Z", Lap: 45 },
    { Utc: "2021-07-18T15:51:07.335Z", Lap: 46 },
    { Utc: "2021-07-18T15:52:38.055Z", Lap: 47 },
    { Utc: "2021-07-18T15:54:09.274Z", Lap: 48 },
    { Utc: "2021-07-18T15:55:40.555Z", Lap: 49 },
    { Utc: "2021-07-18T15:57:11.719Z", Lap: 50 },
    { Utc: "2021-07-18T15:58:43.457Z", Lap: 51 },
    { Utc: "2021-07-18T16:00:14.473Z", Lap: 52 },
  ],
  StatusSeries: [
    { Utc: "2021-07-18T13:03:51.809Z", TrackStatus: "AllClear" },
    { Utc: "2021-07-18T13:02:52.283Z", TrackStatus: "Yellow" },
    { Utc: "2021-07-18T13:08:27.505Z", TrackStatus: "AllClear" },
    { Utc: "2021-07-18T13:22:27.139Z", TrackStatus: "Yellow" },
    { Utc: "2021-07-18T13:22:33.991Z", TrackStatus: "AllClear" },
    { Utc: "2021-07-18T14:03:22.568Z", SessionStatus: "Started" },
    { Utc: "2021-07-18T14:04:17.638Z", TrackStatus: "Yellow" },
    { Utc: "2021-07-18T14:04:31.061Z", TrackStatus: "SCDeployed" },
    { Utc: "2021-07-18T14:06:38.721Z", SessionStatus: "Aborted" },
    { Utc: "2021-07-18T14:06:38.858Z", TrackStatus: "Red" },
    { Utc: "2021-07-18T14:31:42.136Z", TrackStatus: "AllClear" },
    { Utc: "2021-07-18T14:42:00.113Z", SessionStatus: "Started" },
    { Utc: "2021-07-18T14:47:06.815Z", TrackStatus: "Yellow" },
    { Utc: "2021-07-18T14:47:15.718Z", TrackStatus: "AllClear" },
    { Utc: "2021-07-18T15:53:54.935Z", TrackStatus: "Yellow" },
    { Utc: "2021-07-18T15:54:04.727Z", TrackStatus: "AllClear" },
    { Utc: "2021-07-18T16:01:46.067Z", SessionStatus: "Finished" },
    { Utc: "2021-07-18T16:05:03.493Z", SessionStatus: "Finalised" },
    { Utc: "2021-07-18T16:05:03.493Z", SessionStatus: "Ends" },
  ],
};

console.log(
  inputJsonStream(
    "https://livetiming.formula1.com/static/2021/2021-07-18_British_Grand_Prix/2021-07-18_Race/TrackStatus.jsonStream"
  )
);
