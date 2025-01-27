import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import BackupIcon from '@mui/icons-material/Backup';

export default function Registro() { 

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const [pagamento, setPagamento] = useState('');

  const navigation = useNavigate();

  const registrar = async (event) => { 
    event.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({ nome, email, data, valor, pagamento })
      });

      if (resposta.ok) {
        alert('Registrado com sucesso✅');
        navigation('/');
      } else {
        alert('Erro ao registrar ❎');
      }
    } catch {
      alert('Erro de conexão! Verifique o servidor ❎');
    }
  }

  return (
    <main>
      <Header /> 
      <h1>Registrar Dívidas</h1>
      <form onSubmit={registrar} className="formulario">
      
        <input type="text" value={nome} placeholder="Coloque o nome do credor" onChange={(event) => setNome(event.target.value)} />
        <input type="email" value={email} placeholder="Coloque o email do credor" onChange={(event) => setEmail(event.target.value)} />
        <input type="date" value={data} placeholder="Coloque a data a pagar" onChange={(event) => setData(event.target.value)} />
        <input 
  type="number" value={valor} placeholder="Coloque o valor da transferência" onChange={(event) => { const novoValor = Number(event.target.value);
    if (novoValor > 0 || event.target.value === "") { // Permite valores maiores que 0
      setValor(event.target.value);
    }}}/>
        
        <div>
          <label>
            <input type="radio" value="Pix" checked={pagamento === "Pix"} onChange={(event) => setPagamento(event.target.value)} />
            Pix
          </label>

          <label>
            <input type="radio" value="Cartão" checked={pagamento === "Cartão"} onChange={(event) => setPagamento(event.target.value)} />
            Cartão
          </label>

          <label>
            <input type="radio" value="Dinheiro" checked={pagamento === "Dinheiro"} onChange={(event) => setPagamento(event.target.value)} />
            Dinheiro
          </label>
        </div>

        <button><BackupIcon/></button>
      </form>
    </main>
  );
}
