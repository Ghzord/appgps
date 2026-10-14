import { useState } from 'react';

export default function RegisterScreen({ goToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setMsg('');

    if (!name || !email || !password) {
      setMsg('⚠️ Preencha todos os campos para cadastrar.');
      return;
    }

    setMsg('✅ Cadastro realizado com sucesso na Web Finder!');
    setTimeout(() => {
      goToLogin();
    }, 1200);
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h2 className="title">Web Finder</h2>
        <p className="subtitle">Crie sua nova conta na plataforma</p>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Nome Completo</label>
            <input
              type="text"
              className="input-field"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              className="input-field"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              className="input-field"
              placeholder="Crie uma senha forte"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {msg && <p className="msg-text">{msg}</p>}

          <button type="submit" className="btn-primary">Cadastrar</button>
        </form>

        <p className="footer-text">
          Já tem uma conta?{' '}
          <button className="link-btn" onClick={goToLogin}>
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
}