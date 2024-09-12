import Questionario from "@/components/Questionario";
import QuestaoModel from "@/model/questao";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

const BASE_URL = "https://quiz-ten-omega.vercel.app/api"

export default function Home() {
  const router = useRouter()

  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function carregarIDsDasQuestoes(){
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }
  
  async function carregarQuestao(idQuestao: number){
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    carregarIDsDasQuestoes()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 &&  carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  function respostaFornecida(indice: number): void{
    setQuestao(questao?.responderCom(indice))
  }

  function tempoEsgotado(){
    if(questao?.naoRespondida){
      setQuestao(questao?.responderCom(-1))
    } 
  }

  function questaoRespondida(questaoRespondida: QuestaoModel){
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function idProximaPergunta(){
    if(questao){
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
      return idsDasQuestoes[proximoIndice]
    }
  }  

  function irParaProximoPasso(){
    const proximoId = idProximaPergunta()
    proximoId ? irParaProximaQuestao(proximoId) : finalizar()
  }

  function irParaProximaQuestao(proximoId: number){
    carregarQuestao(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: "/resultado",
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return questao ? (
      <Questionario
        questao={questao}
        ultimaQuestao={idProximaPergunta() === undefined}
        questaoRespondida={questaoRespondida}
        irParaProximoPasso={irParaProximoPasso}
      />
  ) : false 
}
