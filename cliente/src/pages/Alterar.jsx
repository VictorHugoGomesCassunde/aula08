import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import LoopIcon from '@mui/icons-material/Loop';

export default function Alterar() {
    const { id } = useParams();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState('');
    const [valor, setValor] = useState('');
    const [pagamento, setPagamento] = useState('');

    const navigation = useNavigate();

    useEffect(() => {
        const busca = async () => {
            try {
                const resposta = await fetch('http://localhost:3000/usuarios/' + id);
                const dados = await resposta.json();
                setNome(dados.nome);
                setEmail(dados.email);
                setData(dados.data);
                setValor(dados.valor);
                setPagamento(dados.pagamento); 
            } catch (error) {
                alert("Erro ao carregar dados");
            }
        };
        busca();
    }, [id]);

    const alterar = async (event) => {
        event.preventDefault();
        try {
            await fetch('http://localhost:3000/usuarios/' + id, {
            
                method: 'PUT',
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify({
                    nome,
                    email,
                    data,
                    valor,
                    pagamento 
                })
            });
            alert('Alterado com sucesso ✅');
            navigation('/');
        } catch {
            alert('Erro ao alterar ❎');
        }
    };

    return (
        <div>
            <Header />
            <h1>Alterar Informações do Credor</h1>
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
                <input
                    type="date"
                    value={data}
                    placeholder="Alterar data"
                    onChange={(evento) => setData(evento.target.value)}
                />
                <input
                    type="number"
                    value={valor}
                    placeholder="Alterar o valor"
                    onChange={(event) => {
                        const novoValor = Number(event.target.value);
                        if (novoValor > 0 || event.target.value === "") { 
                            setValor(event.target.value);
                        }
                    }}
                />

<div>
  <label>
    <input
      type="radio"
      value="Pix"
      checked={pagamento === "Pix"}
      onChange={(event) => setPagamento(event.target.value)}
    />
    Pix
  </label>

  <label>
    <input
      type="radio"
      value="Cartão"
      checked={pagamento === "Cartão"}
      onChange={(event) => setPagamento(event.target.value)}
    />
    Cartão
  </label>

  <label>
    <input
      type="radio"
      value="Dinheiro"
      checked={pagamento === "Dinheiro"}
      onChange={(event) => setPagamento(event.target.value)}
    />
    Dinheiro
  </label>
</div>

                <button><LoopIcon /></button>
            </form>
        </div>
    );
}
