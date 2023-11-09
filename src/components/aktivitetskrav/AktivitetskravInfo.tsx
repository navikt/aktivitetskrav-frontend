import React from "react"
import { BodyLong, Heading } from "@navikt/ds-react"
import { Chat2Icon, DocPencilIcon, PersonIcon } from "@navikt/aksel-icons"
import {
    hvaBetyrDetText,
    hvaMaDuGjoreText,
    hvordanVurdererText,
} from "./InfoTexts"
import { IconRow } from "@/components/icons/IconRow";

interface Props {
    harArbeidsgiver: boolean
}

export const AktivitetskravInfo = ({ harArbeidsgiver }: Props) => {
    return (
        <div className="flex flex-col gap-8">
            <div className="mb-4">
                <BodyLong spacing>Hei!</BodyLong>

                <BodyLong>
                    Det er på tide å informere deg om aktivitetsplikten. Alle
                    sykmeldte skal i utgangspunktet jobbe litt hvis de kan, også
                    hvis de er 100 % sykmeldt. Dette kalles aktivitetsplikt i
                    folketrygdloven.
                </BodyLong>
            </div>

            <IconRow icon={<DocPencilIcon />}>
                <div>
                    <Heading size="medium" level="3" spacing>
                        Hvordan vurderer NAV aktivitetsplikten?
                    </Heading>

                    <BodyLong>{hvordanVurdererText(harArbeidsgiver)}</BodyLong>
                </div>
            </IconRow>

            <IconRow icon={<PersonIcon />}>
                <div>
                    <Heading size="medium" level="3" spacing>
                        Hva betyr det for deg?
                    </Heading>

                    <BodyLong>{hvaBetyrDetText(harArbeidsgiver)}</BodyLong>
                </div>
            </IconRow>

            <IconRow icon={<Chat2Icon />}>
                <div>
                    <Heading size="medium" level="3" spacing>
                        Hva må du gjøre?
                    </Heading>

                    <BodyLong>{hvaMaDuGjoreText(harArbeidsgiver)}</BodyLong>
                </div>
            </IconRow>
        </div>
    )
}
