// import Botao from "@/components/Botao";
// import Questao from "@/components/Questao";
import Questionario from "@/components/Questionario";
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

  function tempoEsgotado(){
    if(questao.naoRespondida){
      setQuestao(questao.responderCom(-1))
    } 
  }

  function questaoRespondida(questao: QuestaoModel){}
  
  function irParaProximoPasso(){}

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Questionario
        questao={questao}
        ultimaQuestao={false}
        questaoRespondida={questaoRespondida}
        irParaProximoPasso={irParaProximoPasso}

      />
      {/* <Questao 
        valor={questao} 
        respostaFornecida={respostaFornecida} 
        tempoEsgotado={tempoEsgotado}
        tempoParaResposta={5}
      />
    <Botao texto="Próxima"/> */}
    </div>
  );
}
