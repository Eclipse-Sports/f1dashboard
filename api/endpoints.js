import csv from "csvtojson";

const pages = [
  "SessionData.json", //1 -- after 2020
  "SessionInfo.json", //1
  "ArchiveStatus.json", // rnd=1880327548
  "Heartbeat.jsonStream", // Probably time synchronization?
  "AudioStreams.jsonStream", // Link to audio commentary
  "DriverList.jsonStream", // Driver info and line story
  "ExtrapolatedClock.jsonStream", //Boolean
  "RaceControlMessages.json", // Flags etc
  "SessionStatus.jsonStream", // Start and finish times
  "TeamRadio.jsonStream", // Links to team radios
  "TimingAppData.jsonStream", // Tyres and laps (juicy)
  "TimingStats.jsonStream", // 'Best times/speed' useless
  "TrackStatus.jsonStream", // SC, VSC and Yellow
  "WeatherData.jsonStream", // Temp, wind and rain
  "Position.z.jsonStream", // Coordinates, not GPS? (.z)
  "CarData.z.jsonStream", // Telemetry channels (.z)
  "ContentStreams.jsonStream", // Lap by lap feeds
  "TimingData.jsonStream", // Gap to car ahead
  "LapCount.jsonStream", // Lap counter
  "ChampionshipPrediction.jsonStream", // Points
];

// var data = await csv().fromFile(
//   "/Users/ergunacikoz/projects/f1dashboard/api/f1_2020.csv"
// );

const baseURL = "https://livetiming.formula1.com/static/";

var urls = [];

data.forEach((element) => {
  let date = element.EventDate;
  let year = element.Year;
  let name = element.EventName.split(" ").join("_");
  let url = baseURL + `${year}/${date}_${name}/${date}_Race/`;
  pages.forEach((page) => {
    let newUrl = url + page;
    urls.push(newUrl);
  });
});
console.log(urls);
