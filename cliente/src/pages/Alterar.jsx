import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import LoopIcon from '@mui/icons-material/Loop';

export default function Alterar() {

    const { id } = useParams();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
        const busca = async()=>{
            const resposta = await fetch('http://localhost:3000/usuarios/'+ id );
            const dados = await resposta.json();
            setNome(dados.nome);
            setEmail(dados.email);
        }
        busca();
    } ,[]);

    const alterar = async(event) => {
        event.preventDefault();
        try{
            await fetch('http://localhost:3000/usuarios/'+ id, 
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'Application/json'},
                    body: JSON.stringify({
                        nome: nome,
                        email: email
                    })
                }
            );
            alert('alterar com sucesso');
            navigation('/');
        }catch{
            alert('Erro ao alterar');
        }
    }
    return (
        <div>
        <Header /> 
        <h1>Alterar Usuário</h1>
        <form onSubmit={alterar} className="formulario">
          <input
            type="text"
            value={nome}
            placeholder="Alterar nome"
            onChange={(evento) => setNome(evento.target.value)}
          />
          <input
            type="text"
            value={email}
             placeholder="Alterar email"
            onChange={(evento) => setEmail(evento.target.value)}
          />
          <button><LoopIcon/></button>
        </form>
      </div>
    );
}