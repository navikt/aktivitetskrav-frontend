import React, { ReactNode } from "react"
import styles from "./circledicon.module.css"

interface Props {
    icon: ReactNode
    className?: string
}

const CircledIcon = ({ icon, className }: Props) => {
    return (
        <div className={`w-16 ${className}`}>
            <span className={styles.circle}>{icon}</span>
        </div>
    )
}

export default CircledIcon
