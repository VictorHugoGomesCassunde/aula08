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
  const doc = new jsPDF();

  const tabela = usuarios.map(usuario => [
    usuario.id,
    usuario.nome,
    usuario.email,
  ]);

  doc.text("Lista de Usuários", 10, 10); // Título do PDF

  doc.autoTable({
    head: [["ID", "Nome", "E-mail"]], // Cabeçalho da tabela
    body: tabela,                    // Dados da tabela
    
  });
  const nomeInput = document.getElementById("nomeInput")?.value || "Não informado";
  const emailInput = document.getElementById("emailInput")?.value || "Não informado";

  doc.text("Informações do usuario:", 10, doc.lastAutoTable.finalY + 10); // Adiciona após a tabela
  doc.text(`Nome: ${nomeInput}`, 10, doc.lastAutoTable.finalY + 20);
  doc.text(`E-mail: ${emailInput}`, 10, doc.lastAutoTable.finalY + 30);


  doc.save("usuarios.pdf"); // Nome do arquivo PDF
};

    return (
      
      <div>
        <Button variant="contained" onClick={()=> exportarPDF()}>
          Gerar PDF
        </Button>

        <table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>E-mail</th>
    </tr>

    <div>
  <input id="nomeInput" type="nome" placeholder="Digite o Nome" />
  <input id="emailInput" type="email" placeholder="Digite o E-mail" />
</div>

  </thead>
  
  <tbody>
    {usuarios.map((usuario) => (
      <tr key={usuario.id}>
        <td>{usuario.nome}</td>
        <td>{usuario.email}</td>
        <td>
          <button onClick={() => removerPessoa(usuario.id)}>Excluir</button>
          <Link to={'/alterar/' + usuario.id}>
            <button>Alterar</button>
          </Link>
          
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}