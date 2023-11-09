import React, { ReactNode } from "react"
import { MedUtenAGVisning } from "../../pages/aktivitetsplikt"
import { PageHeadingWithImage } from "./PageHeadingWithImage"
import { PageHeading } from "./PageHeading"

interface Props {
    headerText: string
    image?: MedUtenAGVisning
    children: ReactNode
}

export const Page = ({ headerText, image, children }: Props) => {
    return (
        <div className="mb-8">
            {image ? (
                <PageHeadingWithImage headerText={headerText} image={image} />
            ) : (
                <PageHeading headerText={headerText} />
            )}

            <div className="flex flex-col items-center p-8">
                <div className="flex flex-col max-w-4xl gap-8">{children}</div>
            </div>
        </div>
    )
}
