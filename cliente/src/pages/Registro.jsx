import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import BackupIcon from '@mui/icons-material/Backup';



export default function Registro() { 

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigate();

  const registrar = async (event) => { 
    event.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({ nome, email })
      });
      if (resposta.ok) {
        navigation('/');
      }
      alert('Registrado com sucesso✅');
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
        <button><BackupIcon/></button>
      
      </form>
    </main>
  );
}
