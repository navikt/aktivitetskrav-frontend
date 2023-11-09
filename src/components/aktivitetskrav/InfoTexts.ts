export const hvordanVurdererText = (harArbeidsgiver: boolean) => {
    if (harArbeidsgiver) {
        return (
            "Når du har vært sykmeldt i åtte uker er NAV lovpålagt å sjekke at du oppfyller aktivitetsplikten din. " +
            "I de fleste tilfellene vurderer vi dette ut fra sykmeldingen din. Noen ganger er ikke det nok og vi må be legen, " +
            "arbeidsgiveren eller deg om mer informasjon. Hører du ikke noe fra oss så er alt i orden. " +
            "Selv om vi tar kontakt betyr det ikke at noe er galt. Vi trenger bare litt mer informasjon for å gjøre vurderingen."
        )
    }
    return (
        "Når du har vært sykmeldt i åtte uker er NAV lovpålagt å sjekke at du oppfyller aktivitetsplikten din. " +
        "I de fleste tilfellene vurderer vi dette ut fra sykmeldingen din. Noen ganger er ikke det nok og vi må be " +
        "legen eller deg om mer informasjon. Hører du ikke noe fra oss så er alt i orden. " +
        "Selv om vi tar kontakt betyr det ikke at noe er galt. Vi trenger bare litt mer informasjon for å gjøre vurderingen."
    )
}

export const hvaBetyrDetText = (harArbeidsgiver: boolean) => {
    if (harArbeidsgiver) {
        return (
            "Hvis vi vurderer at aktivitetsplikten ikke er oppfylt, må vi stoppe utbetalingen av sykepenger. " +
            "Du kan få unntak fra aktivitetsplikten på grunn av helsesituasjonen din, eller fordi det ikke er mulig å tilrettelegge på arbeidsplassen din. " +
            "Hvis du har begynt å jobbe noe igjen, eller er i en annen arbeidsrettet aktivitet som du har avtalt med veilederen din, er aktivitetsplikten din oppfylt."
        )
    }
    return (
        "Hvis vi vurderer at aktivitetsplikten ikke er oppfylt, må vi stoppe utbetalingen av sykepenger. " +
        "Du kan få unntak fra aktivitetsplikten på grunn av helsesituasjonen din. " +
        "Hvis du har begynt å jobbe noe igjen, eller er i en annen arbeidsrettet aktivitet som du har avtalt med veilederen din, er aktivitetsplikten din oppfylt."
    )
}

export const hvaMaDuGjoreText = (harArbeidsgiver: boolean) => {
    if (harArbeidsgiver) {
        return (
            "Vi kommer til å kontakte deg, legen din eller arbeidsgiveren din hvis vi trenger mer informasjon. " +
            "Hvis vi vurderer at aktivitetsplikten ikke er oppfylt, vil du få et forhåndsvarsel om stans av sykepengene. " +
            "Etter det har du tre uker på å gi oss mer informasjon, eller begynne å jobbe igjen og informere oss om det. NAV vil holde deg oppdatert på Min side."
        )
    }
    return (
        "Vi kommer til å kontakte deg eller legen din hvis vi trenger mer informasjon. " +
        "Hvis vi vurderer at aktivitetsplikten ikke er oppfylt, vil du få et forhåndsvarsel om stans av sykepengene. " +
        "Etter det har du tre uker på å gi oss mer informasjon, eller begynne å jobbe igjen og informere oss om det. NAV vil holde deg oppdatert på Min side."
    )
}
