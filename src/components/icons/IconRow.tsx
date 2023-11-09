import CircledIcon from "./CircledIcon"
import React, { ReactElement } from "react"

interface Props {
    icon: ReactElement
    children: ReactElement
}
export const IconRow = ({ icon, children }: Props) => {
    return (
        <div className="flex flex-row gap-4">
            <CircledIcon className="hidden sm:flex" icon={icon} />
            {children}
        </div>
    )
}
