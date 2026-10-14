import { useState } from 'react';

export default function LoginScreen({ onLoginSuccess, goToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setMsg('');

    if (!email || !password) {
      setMsg('⚠️ Por favor, preencha todos os campos.');
      return;
    }

    setMsg('✅ Login efetuado com sucesso!');
    setTimeout(() => {
      onLoginSuccess(email);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h2 className="title">Entrar</h2>
        <p className="subtitle">Digite seus dados para acessar o GPS</p>

        <form onSubmit={handleLogin}>
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
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {msg && <p className="msg-text">{msg}</p>}

          <button type="submit" className="btn-primary">Entrar</button>
        </form>

        <p className="footer-text">
          Não tem uma conta?{' '}
          <button className="link-btn" onClick={goToRegister}>
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
}