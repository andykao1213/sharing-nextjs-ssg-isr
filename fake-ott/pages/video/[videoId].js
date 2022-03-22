const Video = ({ video }) => {
  return (
    <main>
      <h1>{video.name}</h1>
    </main>
  );
};

export async function getStaticProps(context) {
  console.log("Rendering video page...");
  const { videoId } = context.params;
  const video = await fetch(`http://localhost:3001/videos/${videoId}`).then(
    async (res) => {
      const data = await res.json();
      return data;
    }
  );
  return { props: { video } };
}

export async function getStaticPaths() {
  const videoList = await fetch("http://localhost:3001/videos").then(
    async (res) => {
      const data = await res.json();
      return data;
    }
  );
  return {
    paths: videoList.map(({ id }) => ({ params: { videoId: `${id}` } })),
    fallback: "blocking",
  };
}

export default Video;
