import { useEffect, useRef, useState } from 'react';

import LoginScreen from './components/LoginScreen.jsx';
import RegisterScreen from './components/RegisterScreen.jsx';
import HomeScreen from './components/HomeScreen.jsx';
import ProjectPages from './components/ProjectPages.jsx';
import './App.css';
import './Project.css';
const readPage = () => window.location.hash.slice(1) || 'inicio';
export default function App() {
  const [page, setPage] = useState(readPage);
  const [userEmail, setUserEmail] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const closeMenu = () => { menuRef.current?.close(); setMenuOpen(false); };
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);
  useEffect(() => {
    const change = () => { setPage(readPage()); menuRef.current?.close(); setMenuOpen(false); window.scrollTo(0, 0); };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) { menuRef.current?.close(); setMenuOpen(false); } };
    desktop.addEventListener('change', closeOnDesktop);
    window.addEventListener('hashchange', change);
    return () => { window.removeEventListener('hashchange', change); desktop.removeEventListener('change', closeOnDesktop); };
  }, []);
  const navigate = (next) => { closeMenu(); window.location.hash = next; setPage(next); };
  if (!userEmail) return <div className="project-app auth-entry">
    {page === 'register'
      ? <RegisterScreen goToLogin={() => navigate('login')} />
      : <LoginScreen onLoginSuccess={(email) => { setUserEmail(email); navigate('inicio'); }} goToRegister={() => navigate('register')} />}
  </div>;
  return <div className="project-app">
    <header className="project-header">
      <button className="menu-toggle" aria-label="Abrir menu de navegação" aria-controls="side-menu" aria-expanded={menuOpen} onClick={() => { menuRef.current?.showModal(); setMenuOpen(true); }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg></button>
      <a className="brand" href="#inicio"><img src="aufinder2.png" height="40px"  /><p>Web Finder</p></a>
      <nav className="desktop-nav" aria-label="Navegação principal">{[['inicio', 'Início'], ['como-funciona', 'Como funciona'], ['sobre', 'Sobre nós'], ['gps', 'Painel GPS']].map(([id, title]) => <a key={id} href={`#${id}`} aria-current={page === id ? 'page' : undefined}>{title}</a>)}</nav>
      <button className="logout-link desktop-logout" onClick={() => { setUserEmail(''); navigate('login'); }}>Sair da conta</button>
      <dialog id="side-menu" ref={menuRef} className="side-menu" aria-labelledby="menu-title" onClose={() => setMenuOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className="side-menu-content">
          <div className="side-menu-heading"><span id="menu-title" className="brand"><img src="aufinder2.png" height="40px"  /> Web Finder</span><button className="menu-toggle" aria-label="Fechar menu" onClick={closeMenu}><span aria-hidden="true">×</span></button></div>
          <p className="menu-caption">Explore o projeto</p>
          <nav aria-label="Navegação principal">{[['inicio', 'Início'], ['como-funciona', 'Como funciona'], ['sobre', 'Sobre nós'], ['gps', 'Painel GPS']].map(([id, title]) => <a key={id} href={`#${id}`} onClick={closeMenu} aria-current={page === id ? 'page' : undefined}>{title}</a>)}</nav>
          <div className="side-menu-account"><p>{userEmail}</p><button className="logout-link" onClick={() => { closeMenu(); setUserEmail(''); navigate('login'); }}>Sair da conta</button></div>
        </div>
      </dialog>
    </header>
    <div id="page-content">
      {page !== 'gps' && <main><ProjectPages page={page} /></main>}
      <div hidden={page !== 'gps'}><HomeScreen userEmail={userEmail} onLogout={() => { setUserEmail(''); navigate('login'); }} /></div>
    </div>
    <footer className="project-footer"><a className="brand">   Web Finder</a><p>Tecnologia para apoiar a busca por pessoas desaparecidas.</p><span>Projeto Expotec</span></footer>
  </div>;
}



