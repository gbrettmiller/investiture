import content from '../../content/en.json';

function Home() {
  return (
    <section className="page">
      <h1>{content.app.title}</h1>
      <p>{content.app.tagline}</p>
    </section>
  );
}

export default Home;
