import { useState } from "react";

export default function Registrar() {
  const[nome,setNome] = useState("");
  const[email,setEmail] = useState("");

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
          NavigationPreloadManager('/');
        }
      }catch (err) {
        alert('Erro no registro', err)
      }
      }
return(
<>
<form onSubmit={registro}>
  <input type="text" name="" id="" onChange=(event) => setNome(event)
</form>
</>
)
    }
  
  
      
