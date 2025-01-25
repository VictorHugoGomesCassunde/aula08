import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import BackupIcon from '@mui/icons-material/Backup';



export default function Registro() { 

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');

  const navigation = useNavigate();

  const registrar = async (event) => { 
    event.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({ nome, email, data, valor })
      });
      if (resposta.ok) {
        navigation('/');
      }
      alert('Registrado com sucesso!');
    } catch {
      alert('deu erro aqui arruma!')
    }
  }

  return (
    <main>
      
       <Header /> 
       <h1>Registrar Transferencia</h1>
      <form onSubmit={registrar}className="formulario">
      
        <input type="text" value={nome} placeholder="Coloque o nome do usuario" onChange={(event) => setNome(event.target.value)} />
        <input type="email" value={email} placeholder="Coloque o email do usuario" onChange={(event) => setEmail(event.target.value)} />
        <input type="date" value={data} placeholder="Coloque o data da transferencia" onChange={(event) => setData(event.target.value)} />
        <input 
  type="number" value={valor} placeholder="Coloque o valor da transferência" onChange={(event) => { const novoValor = Number(event.target.value);
    if (novoValor > 0 || event.target.value === "") { // Permite valores maiores que 0
      setValor(event.target.value);
    }}}/>

        <button><BackupIcon/></button>
      
      </form>
    </main>
  );
}
