import { useState, useRef, useEffect } from 'react';

export default function HomeScreen({ userEmail, onLogout }) {
  // Inicializa com a localização padrão fornecida
  const [coords, setCoords] = useState({ lat: -24.003902, lng: -46.423114 });
  const [connected, setConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePortName, setActivePortName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [rawSerialData, setRawSerialData] = useState(''); // Guarda última linha lida
  
  const dropdownRef = useRef(null);

  // Fecha o menu de perfil se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const connectSerial = async () => {
    try {
      if (!('serial' in navigator)) {
        alert('A Web Serial API não é suportada por este navegador. Use o Google Chrome ou Edge no Desktop.');
        return;
      }

      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      
      setConnected(true);
      setActivePortName('Porta USB Conectada');
      setIsModalOpen(false);

      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += value;
        const lines = buffer.split('\n');
        buffer = lines.pop(); // Guarda pedaço incompleto no buffer

        for (const line of lines) {
          // Limpa caracteres invisíveis de final de linha (\r)
          const cleanLine = line.trim();
          if (!cleanLine) continue;

          setRawSerialData(cleanLine); // Mostra no painel o dado cru recebido

          const parts = cleanLine.split(',');
          if (parts.length === 2) {
            const lat = parseFloat(parts[0]);
            const lng = parseFloat(parts[1]);

            // Valida se são números válidos de latitude e longitude
            if (!isNaN(lat) && !isNaN(lng)) {
              // Atualiza as coordenadas em tempo real assim que chegam
              setCoords({ lat, lng });
            }
          }
        }
      }
    } catch (error) {
      console.error("Erro ao conectar na porta serial:", error);
      alert("Erro ao abrir a porta serial. Verifique se o Serial Monitor do Arduino IDE está FECHADO.");
      setIsModalOpen(false);
      setConnected(false);
    }
  };

  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : 'U';

  return (
    <div className="home-container">
      {/* Barra superior */}
      <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', flexWrap: 'wrap', gap: '10px' }}>
        <div className="logo" style={{ fontSize: '18px', fontWeight: 'bold' }}>Web Finder</div>
        
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
          <button 
            className="btn-secondary" 
            onClick={() => setIsModalOpen(true)}
            style={{ fontSize: '13px', padding: '8px 12px', whiteSpace: 'nowrap' }}
          >
            🔌 {connected ? 'Arduino Conectado' : 'Conectar Arduino'}
          </button>

          {/* Ícone de Perfil com Menu Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#007acc',
                color: 'white',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
              title="Conta do usuário"
            >
              {userInitial}
            </button>

            {/* Menu Dropdown do Perfil */}
            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '50px',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
                width: '240px',
                padding: '16px',
                zIndex: 100,
                textAlign: 'left'
              }}>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>Conta conectada</p>
                <p style={{ fontSize: '14px', color: '#0f172a', fontWeight: 'bold', wordBreak: 'break-all', marginBottom: '16px' }}>{userEmail}</p>
                
                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '12px' }} />

                <button 
                  className="btn-danger" 
                  onClick={onLogout}
                  style={{ width: '100%', padding: '8px', fontSize: '13px', textAlign: 'center' }}
                >
                  Sair da Conta
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-content" style={{ padding: '20px 12px' }}>
        <div className="dashboard-card" style={{ textAlign: 'left', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 className="title" style={{ textAlign: 'left', marginBottom: '4px', fontSize: '20px' }}>Painel de Monitoramento GPS</h2>
              <p className="subtitle" style={{ textAlign: 'left', margin: 0, fontSize: '13px' }}>
                Dispositivo de rastreio em tempo real
              </p>
            </div>
            <div style={{ padding: '6px 10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
              Status: <span style={{ color: connected ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>
                {connected ? (activePortName || 'Conectado') : 'Desconectado (Exibindo Local padrão)'}
              </span>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '20px' }} />

          <div>
            {/* Leitura bruta do Serial para Debug */}
            {rawSerialData && (
              <div style={{ marginBottom: '15px', padding: '8px 12px', background: '#f1f5f9', borderRadius: '6px', fontSize: '12px', color: '#475569' }}>
                Última leitura serial: <code>{rawSerialData}</code>
              </div>
            )}

            {/* Exibição das Coordenadas */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 140px', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: '600' }}>Latitude</span>
                <strong style={{ fontSize: '14px', color: '#0f172a', wordBreak: 'break-all' }}>{coords.lat}</strong>
              </div>
              <div style={{ flex: '1 1 140px', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: '600' }}>Longitude</span>
                <strong style={{ fontSize: '14px', color: '#0f172a', wordBreak: 'break-all' }}>{coords.lng}</strong>
              </div>
            </div>

            {/* Mapa Google Maps */}
            <div style={{ width: '100%', height: '350px' }}>
              <iframe
                title="Google Maps"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '8px' }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Conexão */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ padding: '15px' }}>
          <div className="modal-content" style={{ maxWidth: '380px' }}>
            <div className="modal-header">
              <h3>Conectar Dispositivo Arduino</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            
            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '14px', marginBottom: '20px', color: '#0369a1', fontSize: '13px', lineHeight: '1.4' }}>
              <p style={{ margin: 0 }}>
                💡 <strong>Como funciona:</strong> Ao clicar abaixo, selecione a porta COM do seu Arduino na janela do navegador.
              </p>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', marginBottom: '10px' }}
              onClick={connectSerial}
            >
              Abrir Seleção de Porta USB
            </button>

            <button 
              className="btn-secondary" 
              style={{ width: '100%', background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' }}
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}