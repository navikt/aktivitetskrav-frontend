import { Heading } from "@navikt/ds-react"
import React from "react"

interface Props {
    headerText: string
}

export const PageHeading = ({ headerText }: Props) => {
    return (
        <div className="flex flex-row bg-header-color p-8 items-center justify-center">
            <Heading size="xlarge" level="1">
                {headerText}
            </Heading>
        </div>
    )
}
