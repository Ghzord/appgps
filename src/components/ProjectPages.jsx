// Preencha name e photo com os nomes e os caminhos das fotos em public.
const teamMembers = [
  { name: 'Karina', photo: './equipe/karina.jpg' },
  { name: 'Guilherme', photo: './equipe/gui.jpg' },
  { name: 'Nicolas', photo: './equipe/nicolas.jpg' },
  { name: 'Felipe', photo: './equipe/felipe.jpg' },
  { name: 'Angelina', photo: './equipe/angelina.jpg' },
];
function Illustration() {
  return <div className="project-illustration" role="img" aria-label="Ilustração de um dispositivo GPS enviando sua posição ao mapa">
    <svg viewBox="0 0 440 380" fill="none" aria-hidden="true"><defs><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" stroke="#dbe7f5" /></pattern></defs><path fill="url(#grid)" d="M0 0h440v380H0z" /><path d="M-20 290 90 230 180 275 330 160 460 215M100 -20 165 95 85 190 175 400M300 -10 245 110 350 240 290 400" stroke="#cddff4" strokeWidth="22" /><circle cx="280" cy="165" r="110" stroke="#92b6e0" /><circle cx="280" cy="165" r="64" fill="#9cc7f533" stroke="#92b6e0" /><path d="m108 290 60-49 50 12 64-81" stroke="#2383d1" strokeWidth="3" strokeDasharray="7 7" /><path d="M305 149c0 22-25 43-25 43s-25-21-25-43a25 25 0 1 1 50 0Z" fill="#007acc" /><circle cx="280" cy="149" r="9" fill="white" /></svg>
    <span className="illustration-tag">● Tecnologia que aproxima</span><div className="device-card"><span className="device-icon">◎</span><div><strong>Arduino + GPS</strong><p>Localização no aplicativo</p></div></div><span className="illustration-caption">Ilustração do projeto</span>
  </div>;
}
function CTA() { return <section className="project-cta"><div><span className="eyebrow">CONHEÇA NA PRÁTICA</span><h2>Veja o painel de localização.</h2><p>Conecte o Arduino para acompanhar os dados enviados pelo GPS.</p></div><a className="project-button light" href="#gps">Abrir painel GPS</a></section>; }
const steps = [
  ['01', 'O GPS recebe a posição', 'O módulo GPS obtém as coordenadas do dispositivo que acompanha a pessoa.'],
  ['02', 'O Arduino envia os dados', 'Nesta versão do app, a placa transmite latitude e longitude por uma conexão USB com o computador.'],
  ['03', 'O app mostra no mapa', 'O painel atualiza a posição conforme recebe novas coordenadas válidas do dispositivo.'],
];

export default function ProjectPages({ page }) {
  if (page === 'sobre') return <div className="project-content">
    <section className="page-intro"><span className="eyebrow">SOBRE NÓS</span><h1>Nossa equipe.<br /><em>Um propósito em comum.</em></h1><p>Somos a equipe que desenvolve o Web Finder, um projeto voltado a apoiar a busca por pessoas desaparecidas com o uso da tecnologia.</p></section>
    <section className="about-layout"><div className="about-copy"><span className="eyebrow">NOSSO PROPÓSITO</span><h2>Ajudar a encontrar pessoas é o que nos move.</h2><p>Por trás de uma pessoa desaparecida, existem familiares e amigos à espera de notícias. Nosso projeto parte dessa preocupação e explora como a informação e a localização podem ajudar nessa busca.</p><p>O Web Finder reúne duas frentes: um site para divulgar os desaparecimentos e este aplicativo para visualizar a localização recebida de um dispositivo com Arduino e GPS.</p><a className="text-link" href="#como-funciona">Entenda como o projeto funciona</a></div></section>
    <section className="team-section" aria-labelledby="team-heading"><span className="eyebrow">QUEM FAZ O WEB FINDER</span><h2 id="team-heading">Conheça nossa equipe</h2><div className="team-photo-grid">{teamMembers.map((member, index) => <figure className="member-card" key={index}>{member.photo ? <img className="member-photo" src={member.photo} alt={`Foto de ${member.name || `integrante ${index + 1}`}`} /> : <div className="member-placeholder" role="img" aria-label={`Espaço para foto do integrante ${index + 1}`}><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="32" cy="22" r="10" /><path d="M12 56v-5a20 20 0 0 1 40 0v5" /></svg><span>Foto do integrante</span></div>}<figcaption>{member.name || `Integrante ${index + 1}`}</figcaption></figure>)}</div></section>
    <section className="purpose-note"><h2>O que queremos construir</h2><p>Uma forma acessível de consultar informações sobre desaparecidos e acompanhar a posição de quem está com o dispositivo. Esse é o objetivo que orienta o desenvolvimento do Web Finder.</p></section><CTA />
  </div>;
  if (page === 'como-funciona') return <div className="project-content">
    <section className="page-intro"><span className="eyebrow">DO DISPOSITIVO AO MAPA</span><h1>Como o <em>Web Finder funciona.</em></h1><p>Conheça o papel de cada parte do projeto e entenda como a localização chega ao aplicativo.</p></section>
    <section className="platform-grid" aria-label="Frentes do projeto: site e aplicativo"><article className="feature-card"><span className="eyebrow">NO SITE</span><h2>Informações para a busca</h2><p>O site permite cadastrar pessoas desaparecidas e consultar uma lista com a cidade de cada caso. É onde ficam as informações para a divulgação dos desaparecimentos.</p></article><article className="feature-card tinted"><span className="eyebrow">NESTE APLICATIVO</span><h2>Acompanhamento pelo GPS</h2><p>O aplicativo recebe as coordenadas do Arduino e exibe a localização do dispositivo no mapa. A posição acompanha a pessoa que estiver com ele.</p></article></section>
    <section className="project-section"><div className="section-heading"><span className="eyebrow">COMO A LOCALIZAÇÃO CHEGA ATÉ VOCÊ</span><h2>Da posição recebida à visualização.</h2></div><div className="steps-grid">{steps.map(([n,t,d]) => <article className="step-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>
    <CTA />
  </div>;
  return <div className="project-content">
    <section className="project-hero"><div className="hero-copy"><h1>Tecnologia para<br /><em>ajudar a encontrar.</em></h1><p>Um projeto dedicado à busca por pessoas desaparecidas. Unimos a divulgação de informações no site ao acompanhamento de localização com Arduino e GPS no aplicativo.</p><div className="hero-actions"><a className="project-button" href="#gps">Acessar painel GPS</a><a className="text-link" href="#como-funciona">Conheça o projeto</a></div></div><Illustration /></section>
    <section className="project-strip" aria-label="Frentes do projeto"><div><strong>Informação</strong><span>Cadastro e divulgação no site</span></div><div><strong>Localização</strong><span>Arduino e GPS no aplicativo</span></div><div><strong>Pessoas</strong><span>A razão de todo o projeto</span></div></section>
    <section className="project-section"><div className="section-heading"><span className="eyebrow">UM PROJETO, DUAS FRENTES</span><h2>Informação e localização<br />a serviço da busca.</h2><p>Cada parte do Web Finder tem um papel no projeto.</p></div><div className="platform-grid" aria-label="Frentes do projeto: site e aplicativo"><article className="feature-card"><span className="eyebrow">01 / SITE</span><h3>Dar visibilidade aos desaparecimentos</h3><p>Nosso site reúne os cadastros de pessoas desaparecidas em uma lista com suas cidades, ajudando a organizar as informações de cada caso.</p><span className="card-tag">Cadastro · Lista de desaparecidos · Cidade</span></article><article className="feature-card tinted"><span className="eyebrow">02 / APLICATIVO</span><h3>Acompanhar a posição do dispositivo</h3><p>Com o Arduino e um módulo GPS, o app apresenta no mapa as coordenadas recebidas e atualiza a posição conforme novos dados chegam.</p><a className="text-link" href="#como-funciona">Como funciona o GPS</a></article></div></section>
    <section className="team-banner"><div><span className="eyebrow">QUEM ESTÁ POR TRÁS</span><h2>Conheça a nossa equipe.</h2><p>Trabalhamos no desenvolvimento do Web Finder, com o objetivo de usar a tecnologia para apoiar a busca por desaparecidos.</p></div><a className="text-link" href="#sobre">Sobre nós</a></section><CTA />
  </div>;
}




