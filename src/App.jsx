import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Music2,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';

function DateCard() {
  return (
    <div className="date-card" aria-label="Birthday, 23 October">
      <span className="date-spark date-spark-one" aria-hidden="true">✳</span>
      <span className="date-spark date-spark-two" aria-hidden="true">✦</span>
      <p className="date-card-label">A day to celebrate</p>
      <span className="date-number">23</span>
      <div className="date-divider" />
      <p className="date-month">OCTOBER <span>2026</span></p>
      <p className="date-card-footer">Make it a good one.</p>
    </div>
  );
}

function Player() {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    audio.current?.play().catch(() => {
      setNotice('Your browser blocked automatic playback. Press play to start the song.');
    });
  }, []);

  async function toggle() {
    if (!audio.current) return;

    if (playing) {
      audio.current.pause();
      return;
    }

    try {
      await audio.current.play();
      setNotice('');
    } catch {
      setNotice('The song could not be played. Please try again.');
    }
  }

  return (
    <div className="player">
      <audio
        ref={audio}
        src="/audio/blue.mp3"
        autoPlay
        loop
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setNotice('The song file could not be loaded.')}
      />
      <div className={`record ${playing ? 'record-playing' : ''}`} aria-hidden="true">
        <Music2 size={24} />
      </div>
      <div className="player-info">
        <p className="eyebrow">A little background music</p>
        <h3>blue <span>· Yung Kai</span></h3>
        <p>Something to listen to while you look around.</p>
        <div className="player-controls">
          <button className="play-button" onClick={toggle}>
            {playing ? <Pause size={16} /> : <Play size={16} />}
            {playing ? 'Pause' : 'Play song'}
          </button>
          <button
            className="mute-button"
            onClick={() => setMuted((value) => !value)}
            aria-label={muted ? 'Unmute song' : 'Mute song'}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
        {notice && <p className="audio-notice" role="status">{notice}</p>}
      </div>
    </div>
  );
}

const snapshots = [
  {
    number: '01',
    title: 'An afternoon out',
    text: 'A bright little snapshot from a day at the mall.',
    img: '/images/first-sighting.png',
    alt: 'Illustrated snapshot from an afternoon at the mall.',
  },
  {
    number: '02',
    title: 'Waffle break',
    text: 'A sweet treat and a well-earned pause.',
    img: '/images/waffle-moment.png',
    alt: 'Illustrated snapshot of a waffle break at the food court.',
  },
];

export default function App() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span>A birthday note</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#home">The wishes</a>
          <a href="#snapshots">Snapshots</a>
          <a className="nav-highlight" href="#music">Music <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={15} /> 23 OCTOBER · A DAY TO CELEBRATE</p>
          <h1>Happy Birthday,<br /><em>Rithisha!</em></h1>
          <p className="hero-wish">
            Wishing you a day full of good company, great food, and plenty of reasons to smile.
            May the year ahead bring exciting opportunities, new experiences, and all the success you deserve.
          </p>
          <a className="primary-link" href="#snapshots">
            Take a look around <ArrowDown size={16} />
          </a>
        </div>
        <DateCard />
        <div className="hero-caption"><span /> A small birthday greeting, made just for you</div>
      </section>

      <section className="snapshots section-wrap" id="snapshots">
        <div className="bookshelf-backdrop" aria-hidden="true">
          <span className="shelf-book shelf-book-one" />
          <span className="shelf-book shelf-book-two" />
          <span className="shelf-book shelf-book-three" />
          <span className="shelf-book shelf-book-four" />
          <span className="shelf-book shelf-book-five" />
          <span className="shelf-book shelf-book-six" />
          <span className="bookshelf-plank" />
        </div>
        <div className="section-heading">
          <p className="eyebrow">A FEW SNAPSHOTS</p>
          <h2>Little moments,<br /><em>nicely remembered.</em></h2>
          <p>A couple of cheerful scenes to mark the occasion.</p>
        </div>
        <div className="snapshot-grid">
          {snapshots.map((snapshot) => (
            <article className="snapshot-card" key={snapshot.number}>
              <div className="snapshot-image">
                <img src={snapshot.img} alt={snapshot.alt} />
                <span className="snapshot-number">{snapshot.number}</span>
              </div>
              <div className="snapshot-copy">
                <h3>{snapshot.title}</h3>
                <p>{snapshot.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-section" id="music">
        <div className="closing-inner">
          <div className="closing-copy">
            <p className="eyebrow">ONE MORE WISH</p>
            <h2>Have a<br /><em>wonderful year.</em></h2>
            <p>
              Hope you get to celebrate in a way that feels just right.
              Have a brilliant birthday and a great year ahead.
            </p>
            <span className="closing-flourish" aria-hidden="true">— Best wishes —</span>
          </div>
          <Player />
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#home">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span>Happy Birthday, Rithisha</span>
        </a>
        <span>23 October 2026</span>
      </footer>
    </main>
  );
}
