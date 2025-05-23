import React from "react";
import { Heading, LinkPanel } from "@navikt/ds-react";
import NextLink from "next/link";

import { AktivitetskravBox } from "@/components/box/AktivitetskravBox";
import { getShortDateFormat } from "@/utils/dateUtils";
import { AktivitetskravViewItem } from "@/components/view/viewUtils";
import { useFerdigstillForhandsVarsel } from "@/data/ferdigstillVarsel";

const getHeaderText = (viewItem: AktivitetskravViewItem) => {
  switch (viewItem.type) {
    case "UNDER_BEHANDLING":
      return "NAV vurderer aktivitetsplikten din";
    case "INNSTILLING_OM_STANS":
    case "IKKE_OPPFYLT":
      return "Svarfristen har gått ut";
    case "FORHANDSVARSEL":
      return "Forhåndsvarsel om stans av sykepenger";
    case "MOTTATT_VURDERING":
      return "Du har mottatt en vurdering av din aktivitetsplikt";
  }
};

interface Props {
  historicVurderinger: AktivitetskravViewItem[] | null;
}

export const HistoricEventsSummary = ({ historicVurderinger }: Props) => {
  if (historicVurderinger && historicVurderinger.length > 0) {
    return (
      <>
        {/* Ferdigstiller tidligere forhåndsvarsel i tilfelle vurdering har endret seg før sykmeldt har lest forhåndsvarselet */}
        {historicVurderinger?.some(
          (item) => item.type === "FORHANDSVARSEL",
        ) && <FerdigstillForhandsVarsel />}

        <AktivitetskravBox>
          <Heading size="medium" level="2" spacing>
            Tidligere hendelser vedrørende din aktivitetsplikt
          </Heading>

          {historicVurderinger.map((item, index) => {
            return (
              <LinkPanel
                href={`/${item.vurdering.internUuid}`}
                border
                as={NextLink}
                key={index}
              >
                <LinkPanel.Title>
                  {item.vurdering.sistVurdert
                    ? getShortDateFormat(item.vurdering.sistVurdert)
                    : getShortDateFormat(item.vurdering.createdAt)}
                  : {getHeaderText(item)}
                </LinkPanel.Title>
              </LinkPanel>
            );
          })}
        </AktivitetskravBox>
      </>
    );
  }
  return null;
};

const FerdigstillForhandsVarsel = () => {
  useFerdigstillForhandsVarsel();
  return null;
};
