import Questao from "@/components/Questao";
import QuestaoModel from "@/model/questao";
import RespostaModel from "@/model/resposta";
import { useState } from "react";

const questaoMock = new QuestaoModel(1, 'Melhor cor?', [
  RespostaModel.errada("Verde"),
  RespostaModel.errada("Vermelha"),
  RespostaModel.errada("Azul"),
  RespostaModel.certa("Preta"),
])

export default function Home() {
  const [questao, setQuestao] = useState(questaoMock)

  function respostaFornecida(indice: number): void{
    console.log(indice)
    setQuestao(questao.responderCom(indice))
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Questao valor={questao} respostaFornecida={respostaFornecida}/>
    </div>
  );
}
