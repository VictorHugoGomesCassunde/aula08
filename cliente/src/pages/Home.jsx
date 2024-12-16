import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button} from "@mui/material";
import { Link } from "react-router-dom";

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
  try{
    await fetch("http://localhost:3000/usuarios/" + id, {
      method: "DELETE",
    });
  } catch{
    alert("não fui viu!");
  }
 };

    const exportarPDF = () => {
      const doc = new jsPDF

      const tabela = usuarios.map(usuario => [
        usuario.id,
        usuario.nome,
        usuario.email
      ]);
      doc.text("Lista de Usuários",10, 10);

      doc.autoTble({
        head:[[ "ID", "Nome", "E-mail"]],
        body: tabela
      });
      doc.save("alunosIFMS");
    }
    return (
      <div>
        <Button variant="contained" onClick={()=> exportarPDF()}>
          Gerar PDF
        </Button>
    <table>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td> <button onClick={() => removerPessoa(usuario.id)} > X </button> </td>
          <Link to={'/alterar/' + usuario.id}>
            <button>Alterar</button>
          </Link>
        </tr>
      )}
    </table>
    </div>
  );
}