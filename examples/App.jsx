import { useState, useEffect } from 'react';
import content from '../content/en.json';
import { formatDate, truncate } from '../core/utils.js';
import { get } from '../services/api.js';

function App() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [apiResult, setApiResult] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);

  // Theme: apply data-theme attribute to document root (design-system/tokens.css pattern)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // API demo: fetch from a public API using the services layer
  async function handleFetch() {
    setApiLoading(true);
    setApiResult(null);
    try {
      // Using the service layer — in a real app, VITE_API_URL points to your backend
      const data = await get('https://jsonplaceholder.typicode.com/posts/1');
      setApiResult(data);
    } catch {
      setApiResult({ error: content.messages.error });
    }
    setApiLoading(false);
  }

  const ex = content.examples;

  return (
    <div className="app">
      <main className="container">
        {/* Hero — strings from content/en.json */}
        <header className="hero">
          <h1 className="title">
            <span className="title-line">{ex.title}</span>
            <span className="title-accent">{ex.subtitle}</span>
          </h1>
          <p className="subtitle">
            {ex.description}
            <br />
            Run <code>{ex.runCommand}</code> to see this page.
          </p>
        </header>

        {/* Interactive demos — each showcases an architecture layer */}
        <section className="demos">
          {/* Counter — basic React state */}
          <div className="demo-card">
            <h3>{ex.counter.label}</h3>
            <p className="demo-description">{ex.counter.description}</p>
            <button
              className="counter-button"
              onClick={() => setCount(c => c + 1)}
            >
              Count: {count}
            </button>
          </div>

          {/* Theme toggle — design-system/tokens.css via [data-theme] */}
          <div className="demo-card">
            <h3>{ex.theme.label}</h3>
            <p className="demo-description">{ex.theme.description}</p>
            <button
              className="toggle-button"
              onClick={() => setIsDark(d => !d)}
            >
              <span className="toggle-track">
                <span className={`toggle-thumb ${isDark ? 'dark' : 'light'}`} />
              </span>
              <span className="toggle-label">
                {isDark ? ex.theme.dark : ex.theme.light}
              </span>
            </button>
          </div>

          {/* Utilities — core/utils.js pure functions */}
          <div className="demo-card">
            <h3>{ex.utilities.label}</h3>
            <p className="demo-description">{ex.utilities.description}</p>
            <div className="utility-demos">
              <div className="utility-item">
                <span className="utility-label">{ex.utilities.dateLabel}</span>
                <span className="utility-value">{formatDate(new Date())}</span>
              </div>
              <div className="utility-item">
                <span className="utility-label">{ex.utilities.truncateLabel}</span>
                <span className="utility-value">{truncate(ex.utilities.sampleText, 40)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* API demo — services/api.js fetch pattern */}
        <section className="api-demo">
          <div className="demo-card wide">
            <h3>{ex.api.label}</h3>
            <p className="demo-description">{ex.api.description}</p>
            <button
              className="fetch-button"
              onClick={handleFetch}
              disabled={apiLoading}
            >
              {apiLoading ? ex.api.fetching : ex.api.fetchButton}
            </button>
            {apiResult && (
              <div className="api-result">
                <h4>{ex.api.resultTitle}</h4>
                <pre>{JSON.stringify(apiResult, null, 2)}</pre>
              </div>
            )}
          </div>
        </section>

        {/* Show/hide card */}
        <section className="demos single">
          <div className="demo-card">
            <h3>Visibility</h3>
            <p className="demo-description">{content.actions.show}/{content.actions.hide} content</p>
            <button
              className="visibility-button"
              onClick={() => setShowCard(s => !s)}
            >
              {showCard ? content.actions.hide : content.actions.show} Card
            </button>
          </div>
        </section>

        {/* Animated card — all layers working together */}
        <div className={`reveal-card ${showCard ? 'visible' : ''}`}>
          <div className="reveal-card-content">
            <h4>{ex.revealCard.title}</h4>
            <p>{ex.revealCard.message}</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>
            {ex.footer.message}
          </p>
          <code className="prompt">
            &ldquo;{ex.footer.prompt}&rdquo;
          </code>
        </footer>
      </main>
    </div>
  );
}

export default App;
