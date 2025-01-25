import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button} from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import LoopIcon from '@mui/icons-material/Loop';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, []);
  const removerPessoa = async (id) => {
    try {
      await fetch("http://localhost:3000/usuarios/"  + id, {
        method: "DELETE",
      });
      
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
    } catch {
      alert("Erro usuário nao removido!");
    }
  };
  
  
 const exportarPDF = () => {
  const doc = new jsPDF();

  const tabela = usuarios.map((usuario) => [
    usuario.id,
    usuario.nome,
    usuario.email,
    usuario.data,
    usuario.valor
  ]);

  doc.text("Lista de Usuários", 10, 10); // Título do PDF

  doc.autoTable({
    head: [["ID", "Nome", "E-mail", "Data", "Valor"]], // Cabeçalho da tabela
    body: tabela,                    // Dados da tabela
    
  });
  doc.save("usuarios.pdf"); // Nome do arquivo PDF
};

    return ( 
      
      <div>
       
        <Header />
        
        <h1>Planilha de Dívidas</h1>

        <Button variant="contained" className="pdf-button" onClick={()=> exportarPDF()} >
          <PictureAsPdfIcon/>
        </Button>
        <table className="tabela">
        <thead>
    <tr>
      <th>Nome</th>
      <th>E-mail</th>
      <th>Data</th>
      <th>Valor</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    {usuarios.map((usuario) => (
      <tr key={usuario.id}>
        <td>{usuario.nome}</td>
        <td>{usuario.email}</td>
        <td>{usuario.data || "Sem data"}</td>
        <td>R$ {usuario.valor || "Sem valor"}</td>
        <td>

        <button onClick={() => removerPessoa(usuario.id)}>
  <DeleteIcon />
</button>

          <Link to={'/alterar/' + usuario.id}>
            <button><LoopIcon/></button>
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
   
  );
}