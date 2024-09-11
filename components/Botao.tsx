import Link from "next/link"
import styles from "../styles/Botao.module.css"

interface BotaoProps{
    texto: string
    href?: string
    onClick?: (e: any) => void 
}

export default function Botao(pros: BotaoProps){
    function renderizar(){
        return (
            <button 
                className={styles.botao}
                onClick={pros.onClick}
            >{pros.texto}</button>
        )
    }
    
    return pros.href ? (
       <Link href={pros.href}>
        {renderizar()}
       </Link> 
    ) : renderizar()
}