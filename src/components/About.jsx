import content from '../../content/en.json';

function About() {
  return (
    <section className="page">
      <h1>{content.nav.about}</h1>
      <p>Built with Investiture — a clean-architecture scaffold for AI-assisted development.</p>
    </section>
  );
}

export default About;
