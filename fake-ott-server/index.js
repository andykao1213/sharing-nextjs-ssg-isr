const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const port = 3001;

const VIDEOS = [
  { id: 0, name: "創造安娜" },
  { id: 1, name: "汪達幻視" },
  { id: 2, name: "鬼滅之刃" },
  { id: 3, name: "斯卡羅" },
  { id: 4, name: "華燈初上" },
  { id: 5, name: "茶金" },
  { id: 6, name: "紙牌屋" },
  { id: 7, name: "怪奇物語" },
  { id: 8, name: "絕命毒師" },
];

const HISTORY = [
  { id: 0, name: "創造安娜" },
  { id: 1, name: "汪達幻視" },
];

const LINES = [
  {
    id: 0,
    name: "現正熱映",
    items: [
      { id: 0, name: "創造安娜" },
      { id: 1, name: "汪達幻視" },
      { id: 2, name: "鬼滅之刃" },
    ],
  },
  {
    id: 1,
    name: "華語精選",
    items: [
      { id: 3, name: "斯卡羅" },
      { id: 4, name: "華燈初上" },
      { id: 5, name: "茶金" },
    ],
  },
  {
    id: 2,
    name: "美劇精選",
    items: [
      { id: 6, name: "紙牌屋" },
      { id: 7, name: "怪奇物語" },
      { id: 8, name: "絕命毒師" },
    ],
  },
];
const MY_SECRET_TOKEN = "secret_token";

app.use(cors());
app.use(express.json());

app.get("/videos/:videoId", (req, res) => {
  const { videoId } = req.params;
  console.log(`Requesting video ${videoId}...`);
  const video = VIDEOS.find((v) => v.id == videoId);
  if (video !== undefined) {
    res.status(200);
    res.send(video);
  } else {
    res.status(404);
    res.send(`Video ${videoId} not found`);
  }
});
app.get("/videos", (_, res) => {
  console.log(`Requesting video list...`);
  res.status(200);
  res.send(VIDEOS);
});
app.post("/videos", async (req, res) => {
  const newVideoName = req.body.name;
  const newVideoLineId = req.body.lineId;
  console.log(`Add new video ${newVideoName} to line ${newVideoLineId}`);
  const selectedLine = LINES.find(({ id }) => id == newVideoLineId);
  if (selectedLine !== undefined) {
    const newVideoId = VIDEOS.length;
    const newVideo = { id: newVideoId, name: newVideoName };
    VIDEOS.push(newVideo);
    selectedLine.items.push(newVideo);
    try {
      await fetch(
        `http://localhost:3002/api/revalidate/${newVideoId}?secret=${MY_SECRET_TOKEN}`
      );
    } catch (e) {
      console.log(e);
    }
    res.status(200);
    res.send(newVideo);
  } else {
    res.status(404);
    res.send(`Line ${newVideoLineId} not found`);
  }
});
app.get("/history", (_, res) => {
  console.log("Requesting history...");
  res.status(200);
  res.send(HISTORY);
});
app.get("/lines", (_, res) => {
  console.log("Requesting lines...");
  res.status(200);
  res.send(LINES);
});

app.listen(port, () => {
  console.log(`Fake OTT server listening on port ${port}`);
});
