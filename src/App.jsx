import { Routes, Route, Link } from 'react-router-dom';
import content from '../content/en.json';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-brand">{content.app.title}</Link>
          <div className="nav-links">
            <Link to="/">{content.nav.home}</Link>
            <Link to="/about">{content.nav.about}</Link>
          </div>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
