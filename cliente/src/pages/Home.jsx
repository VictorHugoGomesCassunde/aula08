import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import LoopIcon from '@mui/icons-material/Loop';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function Home() {

  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
        setFilteredUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, []);

  const removerPessoa = async (id) => {
    try {
      await fetch("http://localhost:3000/usuarios/" + id, {
        method: "DELETE",
      });

      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
      setFilteredUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
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
      usuario.valor,
      usuario.pagamento
    ]);

    doc.text("Lista de Dívidas", 10, 10); // Título do PDF

    doc.autoTable({
      head: [["ID", "Nome", "E-mail", "Data", "Valor", "Forma de Pagamento"]], // é o cabeçalho da tabela
      body: tabela,                    // Dados da tabela

    });
    doc.save("Dívidas a pagar.pdf"); // Nome do arquivo PDF
  };

  const ordenarUsuarios = (criterio) => {
    let usuariosOrdenados = [...usuarios]; // usando partimos da lista original
  
    if (criterio === "AZ") {
      usuariosOrdenados.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (criterio === "ZA") {
      usuariosOrdenados.sort((a, b) => b.nome.localeCompare(a.nome));
    } else if (criterio === "MENOR_VALOR") {
      usuariosOrdenados.sort((a, b) => (a.valor || 0) - (b.valor || 0));
    } else if (criterio === "MAIOR_VALOR") {
      usuariosOrdenados.sort((a, b) => (b.valor || 0) - (a.valor || 0));
    } else if (criterio === "RECENTE") {
      usuariosOrdenados.sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0));
    } else if (criterio === "ANTIGO") {
      usuariosOrdenados.sort((a, b) => new Date(a.data || 0) - new Date(b.data || 0));
    }
  
    setFilteredUsuarios(usuariosOrdenados); // Atualiza o estado com a nova lista ordenada ╰(*°▽°*)╯
  };
  

  return (
    <div>
      <Header />

      <h1>Planilha de Dívidas</h1>

      <Button variant="contained" className="pdf-button" onClick={() => exportarPDF()} >
        <PictureAsPdfIcon />
      </Button>

      <div className="filter-buttons">
        <Button onClick={() => ordenarUsuarios("AZ")}>A-Z</Button>
        <Button onClick={() => ordenarUsuarios("ZA")}>Z-A</Button>
        <Button onClick={() => ordenarUsuarios("MENOR_VALOR")}>Menor Valor</Button>
        <Button onClick={() => ordenarUsuarios("MAIOR_VALOR")}>Maior Valor</Button>
        <Button onClick={() => ordenarUsuarios("RECENTE")}>Mais Recentes</Button>
        <Button onClick={() => ordenarUsuarios("ANTIGO")}>Mais Antigos</Button>
      </div>

      <table className="tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Forma de pagamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.data}</td>
              <td>R$ {usuario.valor || "Sem valor"}</td>
              <td>{usuario.pagamento || "Sem forma de pagamento"}</td>
              <td>
                <button onClick={() => removerPessoa(usuario.id)}>
                  <DeleteIcon />
                </button>

                <Link to={'/alterar/' + usuario.id}>
                  <button><LoopIcon /></button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
