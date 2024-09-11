import { CountdownCircleTimer } from "react-countdown-circle-timer"
import styles from "../styles/Temporizador.module.css"
import { spawn } from "child_process"
import { Span } from "next/dist/trace"

interface TemporizadorProps{
    duracao: number
    tempoEsgotado: () => void
}

export default function Temporizador(props: TemporizadorProps){
    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer 
                duration={props.duracao}
                size={120}
                isPlaying
                onComplete={props.tempoEsgotado}
                colors={['#BCE596', '#F7B801', '#ED827A']}
                colorsTime={[7, 5, 2]}
            >
                {({remainingTime}) => remainingTime}
            </CountdownCircleTimer>
        </div>
    )
}