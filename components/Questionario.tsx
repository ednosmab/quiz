import styles from "../styles/Questionario.module.css"
import QuestaoModel from "@/model/questao"
import Questao from "./Questao"
import Botao from "./Botao"

interface QuestionarioProps{
    questao: QuestaoModel
    ultimaQuestao: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    irParaProximoPasso: () => void  
}

export default function Questionario(props: QuestionarioProps){
    function respostaFonecida(indice: number){
        if(props.questao.naoRespondida){
            props.questaoRespondida(props.questao.responderCom(indice))
        }
    }

    return (
        <div className={styles.questionario}>
            {props.questao ? 
                <Questao
                    valor={props.questao}
                    tempoParaResposta={6}
                    respostaFornecida={respostaFonecida}
                    tempoEsgotado={props.irParaProximoPasso}
                />
            : false}
            <Botao texto={props.ultimaQuestao ? 'Finalizar' : 'Próxima'} onClick={props.irParaProximoPasso}/>
        </div>
    )
}