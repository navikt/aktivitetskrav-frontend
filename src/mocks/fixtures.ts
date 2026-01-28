import { forhaandsvarselDocumentMock } from "@/mocks/ForhaandsvarselDocumentMock";
import type { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import { addDaysToDate, pastDateAsString } from "@/utils/dateUtils";

const nyKandidatVurdering = (
  dagerSidenOpprettetAktivitetskrav: number,
): AktivitetskravVurdering => {
  return {
    status: "NY",
    internUuid: "12345",
    createdAt: pastDateAsString(dagerSidenOpprettetAktivitetskrav),
  };
};

const unntakVurdering = (
  dagerSidenHendelse: number,
  dagerSidenOpprettetAktivitetskrav: number,
): AktivitetskravVurdering => {
  return {
    status: "UNNTAK",
    internUuid: "12346585686585",
    createdAt: pastDateAsString(dagerSidenOpprettetAktivitetskrav),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
    arsaker: ["MEDISINSKE_GRUNNER"],
  };
};

const oppfyltVurdering = (
  dagerSidenHendelse: number,
  dagerSidenOpprettetAktivitetskrav: number,
): AktivitetskravVurdering => {
  return {
    status: "OPPFYLT",
    internUuid: "244365474",
    createdAt: pastDateAsString(dagerSidenOpprettetAktivitetskrav),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
    arsaker: ["TILTAK"],
  };
};

const ikkeAktuellVurdering = (
  dagerSidenHendelse: number,
  dagerSidenOpprettetAktivitetskrav: number,
): AktivitetskravVurdering => {
  return {
    status: "IKKE_AKTUELL",
    internUuid: "686868",
    createdAt: pastDateAsString(dagerSidenOpprettetAktivitetskrav),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
  };
};

const ikkeOppfyltVurdering = (
  dagerSidenHendelse: number,
  dagerSidenOpprettetAktivitetskrav: number,
): AktivitetskravVurdering => {
  return {
    status: "IKKE_OPPFYLT",
    internUuid: "55554444",
    createdAt: pastDateAsString(dagerSidenOpprettetAktivitetskrav),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
  };
};

const innstillingOmStansVurdering = (
  dagerSidenHendelse: number,
  dagerSidenOpprettetAktivitetskrav: number,
): AktivitetskravVurdering => {
  return {
    status: "INNSTILLING_OM_STANS",
    internUuid: "123123123",
    createdAt: pastDateAsString(dagerSidenOpprettetAktivitetskrav),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
  };
};

const avventVurdering = (
  dagerSidenHendelse: number,
  dagerSidenOpprettetAktivitetskrav: number,
): AktivitetskravVurdering => {
  return {
    status: "AVVENT",
    internUuid: "77322357",
    createdAt: pastDateAsString(dagerSidenOpprettetAktivitetskrav),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
  };
};

const forhaandsvarselVurdering = (
  dagerSidenHendelse: number,
  dagerSidenOpprettetAktivitetskrav: number,
): AktivitetskravVurdering => {
  return {
    status: "FORHANDSVARSEL",
    internUuid: "457474547547",
    createdAt: pastDateAsString(dagerSidenOpprettetAktivitetskrav),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
    journalpostId: "123",
    fristDato: addDaysToDate(new Date(), 14).toISOString(),
    document: forhaandsvarselDocumentMock,
  };
};

const forhaandsvarselVurderingWithoutDocument = (
  dagerSidenHendelse: number,
  dagerSidenOpprettetAktivitetskrav: number,
): AktivitetskravVurdering => {
  return {
    status: "FORHANDSVARSEL",
    internUuid: "1231231313",
    createdAt: pastDateAsString(dagerSidenOpprettetAktivitetskrav),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
    journalpostId: null,
    fristDato: addDaysToDate(new Date(), 14).toISOString(),
    document: null,
  };
};

const forhaandsvarselFixtureWithoutDocument: AktivitetskravVurdering[] = [
  forhaandsvarselVurderingWithoutDocument(10, 30),
  avventVurdering(25, 30),
  nyKandidatVurdering(30),
];

const nyKandidatFixture: AktivitetskravVurdering[] = [nyKandidatVurdering(12)];

const unntakFixture: AktivitetskravVurdering[] = [
  unntakVurdering(4, 33),
  forhaandsvarselVurdering(15, 33),
  avventVurdering(24, 33),
  nyKandidatVurdering(33),
];

const oppfyltFixture: AktivitetskravVurdering[] = [
  oppfyltVurdering(1, 28),
  forhaandsvarselVurdering(15, 28),
  avventVurdering(21, 28),
  nyKandidatVurdering(28),
];

const ikkeOppfyltFixture: AktivitetskravVurdering[] = [
  ikkeOppfyltVurdering(1, 14),
  forhaandsvarselVurdering(4, 14),
  avventVurdering(7, 14),
  nyKandidatVurdering(14),
];

const innstillingOmStansFixture: AktivitetskravVurdering[] = [
  innstillingOmStansVurdering(1, 14),
  forhaandsvarselVurdering(4, 14),
  avventVurdering(7, 14),
  nyKandidatVurdering(14),
];

const ikkeAktuellFixture: AktivitetskravVurdering[] = [
  ikkeAktuellVurdering(13, 29),
  forhaandsvarselVurdering(20, 29),
  avventVurdering(28, 29),
  nyKandidatVurdering(29),
];

const forhaandsvarselFixture: AktivitetskravVurdering[] = [
  forhaandsvarselVurdering(11, 28),
  avventVurdering(21, 28),
  nyKandidatVurdering(28),
];

const fixtures = {
  forhaandsvarselFixture,
  forhaandsvarselFixtureWithoutDocument,
  nyKandidatFixture,
  unntakFixture,
  ikkeAktuellFixture,
  innstillingOmStansFixture,
  ikkeOppfyltFixture,
  oppfyltFixture,
};

export default fixtures;
