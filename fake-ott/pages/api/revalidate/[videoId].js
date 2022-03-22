export default async function handler(req, res) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }
  console.log("Revalidate");
  try {
    const waitForRevalidateVideo = res.unstable_revalidate(
      `/video/${req.query.videoId}`
    );
    const waitForRevalidateHome = res.unstable_revalidate("/");
    await Promise.all([waitForRevalidateHome, waitForRevalidateVideo]);
    return res.json({ revalidated: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error revalidating");
  }
}
