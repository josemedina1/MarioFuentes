import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import customs from './assets/aduanas.jpg';
import exportsImage from './assets/exportacion.jpg';
import importsImage from './assets/importacion.jpg';
import './styles.css';

// Correo que recibe los mensajes del formulario "Contáctanos".
// Para cambiar el destino basta con modificar esta constante.
const CONTACT_EMAIL = 'jmedina@tsgenviro.com';
const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const navigation = [
  ['#sobre-nosotros', 'Sobre nosotros'],
  ['#sector-de-negocios', 'Sector de negocios'],
  ['#contactanos', 'Contactanos'],
];

const slides = [
  {
    image: customs,
    alt: 'Vista aérea de un terminal portuario con contenedores y un buque de carga',
    sector: 'Aduanas',
    lines: ['Conectamos', 'fronteras.'],
    description: 'Gestión documental y coordinación de los trámites aduaneros para el movimiento internacional de mercancías.',
  },
  {
    image: exportsImage,
    alt: 'Buque portacontenedores transportando mercancías por vía marítima',
    sector: 'Exportación',
    lines: ['Tu carga,', 'hacia el mundo.'],
    description: 'Preparación de documentos y coordinación del despacho de mercancías hacia los mercados internacionales.',
  },
  {
    image: importsImage,
    alt: 'Profesional revisando documentos de mercancías en una bodega',
    sector: 'Importación',
    lines: ['Del mundo', 'a tu destino.'],
    description: 'Revisión documental y seguimiento de las operaciones de ingreso de mercancías, desde su llegada hasta su entrega.',
  },
];

function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Campo trampa para bots: si viene con contenido, se ignora el envío.
    if (data._honey) return;

    setStatus('sending');
    setFeedback('');

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Nombre: data.nombre,
          Empresa: data.empresa || '—',
          Correo: data.correo,
          Teléfono: data.telefono || '—',
          Mensaje: data.mensaje,
          _replyto: data.correo,
          _subject: `Nuevo contacto desde el sitio web: ${data.nombre}`,
          _template: 'table',
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || String(result.success) !== 'true') {
        throw new Error(result.message || 'No fue posible enviar el mensaje.');
      }

      form.reset();
      setStatus('success');
      setFeedback('¡Gracias! Recibimos tu mensaje y te responderemos a la brevedad.');
    } catch (error) {
      setStatus('error');
      setFeedback('No pudimos enviar tu mensaje. Por favor, inténtalo nuevamente en unos minutos.');
      console.error('Error al enviar el formulario de contacto:', error);
    }
  }

  const sending = status === 'sending';

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="contact-nombre">Nombre <span aria-hidden="true">*</span></label>
        <input id="contact-nombre" name="nombre" type="text" autoComplete="name" required maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="contact-empresa">Empresa</label>
        <input id="contact-empresa" name="empresa" type="text" autoComplete="organization" maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="contact-correo">Correo electrónico <span aria-hidden="true">*</span></label>
        <input id="contact-correo" name="correo" type="email" autoComplete="email" required maxLength={160} />
      </div>
      <div className="field">
        <label htmlFor="contact-telefono">Teléfono</label>
        <input id="contact-telefono" name="telefono" type="tel" autoComplete="tel" maxLength={30} placeholder="+56 9 1234 5678" />
      </div>
      <div className="field field-full">
        <label htmlFor="contact-mensaje">Mensaje <span aria-hidden="true">*</span></label>
        <textarea id="contact-mensaje" name="mensaje" rows={5} required maxLength={3000} />
      </div>
      <input className="honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-footer field-full">
        <button className="submit-button" type="submit" disabled={sending}>
          {sending ? 'Enviando…' : 'Enviar mensaje'} <span aria-hidden="true">↗</span>
        </button>
        <p className={`form-feedback ${status}`} role="status" aria-live="polite">{feedback}</p>
      </div>
    </form>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(() => window.scrollY > 32);

  useEffect(() => {
    function updateHeader() {
      setHasScrolled(window.scrollY > 32);
    }
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const menuButton = useRef(null);
  const slide = slides[currentSlide];

  function changeSlide(direction) {
    setCurrentSlide(index => (index + direction + slides.length) % slides.length);
  }

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <>
      <header className={hasScrolled ? "header is-scrolled" : "header"}>
        <a className="wordmark" href="#inicio" aria-label="Mario Fuentes, inicio"><strong>MF</strong><span>Mario<br />Fuentes</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} ref={menuButton} aria-controls="navigation">Menú <span aria-hidden="true">☰</span></button>
        <nav id="navigation" aria-label="Menú principal" className={menuOpen ? 'is-open' : undefined}>
          {navigation.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      </header>
      <main id="inicio">
        <section className="hero" aria-label="Presentación">
          <img src={slide.image} alt={slide.alt} />
          <div className="hero-content">
            <p className="eyebrow">Mario Fuentes · Comercio exterior</p>
            <h1 id="hero-title" aria-live="polite">{slide.lines[0]}<br />{slide.lines[1]}</h1>
            <a className="text-link" href="#sobre-nosotros">Sobre nosotros <span aria-hidden="true">↗</span></a>
          </div>
          <div className="controls">
            <span id="slide-number" aria-hidden="true">{String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
            <button onClick={() => changeSlide(-1)} type="button" aria-label="Imagen anterior">←</button>
            <button onClick={() => changeSlide(1)} type="button" aria-label="Imagen siguiente">→</button>
          </div>
        </section>
        <section className="section intro" id="sobre-nosotros">
          <p className="eyebrow">Sobre nosotros</p>
          <h2>Mario Fuentes</h2>
          <p>Presentación corporativa en preparación. Aquí compartiremos nuestra trayectoria y forma de trabajo.</p>
        </section>
        <section className="section sectors" id="sector-de-negocios">
          <p className="eyebrow">Sector de negocios</p>
          <h2>Aduanas y<br />comercio exterior</h2>
          <p>Aduanas, exportación e importación. Cada operación conecta la documentación, la carga y su destino.</p>
          <div className="tiles">
            {slides.map(({ image, alt, sector, description }) => (
              <figure key={sector}>
                <img loading="lazy" src={image} alt={alt} />
                <figcaption><h3>{sector}</h3><p>{description}</p></figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="section contact" id="contactanos">
          <p className="eyebrow">Contáctanos</p>
          <h2>Conversemos.</h2>
          <p>Cuéntanos sobre tu operación de comercio exterior y te responderemos a la brevedad.</p>
          <ContactForm />
        </section>
      </main>
      <footer>Mario Fuentes</footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
