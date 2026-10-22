import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react';

function Book() {
  return (
    <div className="book-art" aria-hidden="true">
      <div className="book">
        <div className="page left"><span>✿</span></div>
        <div className="page right"><span>❧</span></div>
        <i />
      </div>
      <b>✦</b>
      <small>✧</small>
    </div>
  );
}

function Player({ triggerRef }) {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const birthdaySection = triggerRef.current;
    if (!birthdaySection) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      observer.disconnect();
      audio.current?.play().catch(() => {
        setNotice('Automatic playback was blocked. Press play to start the song.');
      });
    }, { threshold: 0.2 });

    observer.observe(birthdaySection);
    return () => observer.disconnect();
  }, [triggerRef]);

  async function toggle() {
    if (!audio.current) return;

    if (playing) {
      audio.current.pause();
      setPlaying(false);
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
        loop
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setNotice('The song file could not be loaded.')}
      />
      <div className={`vinyl ${playing ? 'spin' : ''}`}>
        <span>blue<br />♡</span>
      </div>
      <div className="player-info">
        <p className="eyebrow">A song for this little story</p>
        <h3>blue <small>— Yung Kai</small></h3>
        <p>Let the moment have its own soundtrack.</p>
        <div className="controls">
          <button onClick={toggle}>
            {playing ? <Pause size={16} /> : <Play size={16} />}
            {playing ? 'Pause' : 'Play song'}
          </button>
          <button
            className="mute"
            onClick={() => setMuted((value) => !value)}
            aria-label={muted ? 'Unmute song' : 'Mute song'}
          >
            {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
        </div>
        {notice && <p className="help" role="status">{notice}</p>}
      </div>
    </div>
  );
}

const memories = [
  {
    n: '01',
    label: 'A little moment',
    title: 'The day I noticed you',
    text: 'In the middle of an ordinary, busy day, some little details made the moment feel different. Funny how a memory can quietly stay with you.',
    img: '/images/first-sighting.png',
    alt: 'Painterly mall memory in a white T-shirt, light trousers, clear glasses and cream knitted bag.',
  },
  {
    n: '02',
    label: 'A sweeter memory',
    title: 'A waffle kind of moment',
    text: 'A waffle, a familiar outfit, the warmth of the food court—and a small scene worth remembering. Some memories don’t need to be big to be lovely.',
    img: '/images/waffle-moment.png',
    alt: 'Warm painterly scene of a young woman enjoying a waffle in a mall food court.',
  },
];

export default function App() {
  const birthdayRef = useRef(null);

  return (
    <main>
      <nav>
        <a className="brand" href="#home">✿ <span>a little story</span></a>
        <div>made for Rithisha <span aria-hidden="true">🎀</span></div>
      </nav>
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={14} /> A tiny story, for a special day</p>
          <h1>Every beautiful<br /><em>story begins</em><br />somewhere.</h1>
          <p className="sub">And sometimes, the smallest moments become the ones we remember.</p>
          <a className="scroll" href="#garden">Turn the page <span><ArrowDown size={16} /></span></a>
        </div>
        <Book />
        <label className="footnote">A story in little moments <b>✦</b> 23 October</label>
      </section>
      <section className="garden" id="garden">
        <span className="deco d1">✿</span>
        <span className="deco d2">❀</span>
        <p className="eyebrow">Chapter one · a little garden</p>
        <h2>Some moments bloom<br /><em>when you least expect.</em></h2>
        <p className="intro">Not every lovely thing arrives with a grand entrance. Some simply happen, then stay with us.</p>
        <div className="flowers" aria-hidden="true">✿　❀　✾　✿　❀　✾　✿</div>
      </section>
      <section className="memories" id="memories">
        <div className="heading">
          <p className="eyebrow">Chapter two · little memories</p>
          <h2>Two moments,<br /><em>kept softly.</em></h2>
          <p>Just a couple of scenes that deserve a page of their own.</p>
        </div>
        <div className="memory-list">
          {memories.map((memory, index) => (
            <article className={`memory ${index ? 'reverse' : ''}`} key={memory.n}>
              <div className="memory-photo">
                <div className="frame"><img src={memory.img} alt={memory.alt} /></div>
                <p>a moment to remember <span>✦</span></p>
              </div>
              <div className="memory-copy">
                <p className="eyebrow">{memory.n} / {memory.label}</p>
                <h3>{memory.title}</h3>
                <p>{memory.text}</p>
                <span className="flourish">— ✿ —</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="birthday" id="birthday" ref={birthdayRef}>
        <span className="sparkle s1">✦</span>
        <span className="sparkle s2">✧</span>
        <p className="eyebrow">The final page · today is yours</p>
        <div className="bigflower">✿</div>
        <h2>Happy Birthday,<br /><em>Rithisha.</em></h2>
        <p className="wish">May this next chapter bring you gentle mornings, unexpected happiness, stories you can’t put down, and a hundred little reasons to smile.</p>
        <p className="signoff">Wishing you a beautiful year ahead <span>♡</span></p>
        <div className="music"><Player triggerRef={birthdayRef} /></div>
        <section className="birthday-verse" aria-label="An original birthday verse">
          <p className="eyebrow">A little birthday song</p>
          <p>
            This lovely year is yours to grow,<br />
            With brighter days and skies aglow.<br />
            May laughter find you where you are,<br />
            And every wish reach just as far.
          </p>
        </section>
        <a className="back" href="#home"><ArrowDown size={14} /> Back to the beginning</a>
      </section>
      <footer>
        <span>made with a little care</span>
        <b>✿</b>
        <span>for Rithisha · 23.10.2026</span>
      </footer>
    </main>
  );
}
