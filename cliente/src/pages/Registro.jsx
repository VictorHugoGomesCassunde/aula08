import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Registrar() {

  const[nome,setNome] = useState('');
  const[email,setEmail] = useState('');

  const navigation = useNavigate();

  const registrar = async (event) =>{
    event.preventDefault();
    try{
      const resposta = await fetch('http://localhost:3000/usuarios', {
      method:'POST',
      headers: { 'Content-Type':'Application/json'},
      body: JSON.stringify({
        nome: nome,
        email: email
      })
    });
        if (resposta.ok) {
          navigation('/');
        }
      }catch{
        alert('deu erro aqui arruma!')
      }

   }

return(
<main>
<form onSubmit={registro}>
  <input type="text" name="" id="" value={nome} 
  onChange={(event) => setNome(event.target.value)} />

  <input type="email" name="" id="" value={email} 
  onChange={(event) => setEmail(event.target.value)} />

  <button>Salvar</button>

</form>
</main>
);
    }
  
  
      
