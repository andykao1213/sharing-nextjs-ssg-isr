import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

function Home({ lines, history }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fake OTT</title>
        <meta name="description" content="This is a fake OTT to demo ISR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>歡迎來到 Fake OTT</h1>
        <section>
          <p>觀看紀錄</p>
          <ul>
            {history.map((h) => (
              <Link key={h.id} href={`/video/${h.id}`} passHref>
                <a>
                  <li>{h.name}</li>
                </a>
              </Link>
            ))}
          </ul>
        </section>
        {lines.map((line) => (
          <section key={line.id}>
            <p>{line.name}</p>
            <ul>
              {line.items.map((item) => (
                <Link key={item.id} href={`/video/${item.id}`} passHref>
                  <a>
                    <li>{item.name}</li>
                  </a>
                </Link>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/andykao1213/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by 🧑🏻‍💻 Andrew Kao
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  console.log("Rendering home page...");
  const waitForLines = fetch("http://localhost:3001/lines").then(
    async (res) => {
      const data = await res.json();
      return data;
    }
  );
  const waitForHistory = fetch("http://localhost:3001/history").then(
    async (res) => {
      const data = await res.json();
      return data;
    }
  );
  const [lines, history] = await Promise.all([waitForLines, waitForHistory]);
  return {
    props: { lines, history },
  };
}

export default Home;
