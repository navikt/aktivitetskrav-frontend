import { AktivitetskravVurdering } from "@/schema/aktivitetskravVurderingSchema";
import { addDaysToDate, pastDateAsString } from "@/utils/dateUtils";
import { forhaandsvarselDocumentMock } from "@/mocks/ForhaandsvarselDocumentMock";

const nyKandidatVurdering = (
  dagerSidenHendelse: number,
): AktivitetskravVurdering => {
  return {
    status: "NY",
    internUuid: "12345",
    createdAt: pastDateAsString(dagerSidenHendelse),
  };
};

const unntakVurdering = (
  dagerSidenHendelse: number,
): AktivitetskravVurdering => {
  return {
    status: "UNNTAK",
    internUuid: "12346585686585",
    createdAt: pastDateAsString(dagerSidenHendelse),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
    arsaker: ["MEDISINSKE_GRUNNER"],
  };
};

const oppfyltVurdering = (
  dagerSidenHendelse: number,
): AktivitetskravVurdering => {
  return {
    status: "OPPFYLT",
    internUuid: "244365474",
    createdAt: pastDateAsString(dagerSidenHendelse),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
    arsaker: ["TILTAK"],
  };
};

const ikkeAktuellVurdering = (
  dagerSidenHendelse: number,
): AktivitetskravVurdering => {
  return {
    status: "IKKE_AKTUELL",
    internUuid: "686868",
    createdAt: pastDateAsString(dagerSidenHendelse),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
  };
};

const ikkeOppfyltVurdering = (
  dagerSidenHendelse: number,
): AktivitetskravVurdering => {
  return {
    status: "IKKE_OPPFYLT",
    internUuid: "55554444",
    createdAt: pastDateAsString(dagerSidenHendelse),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
  };
};

const avventVurdering = (
  dagerSidenHendelse: number,
): AktivitetskravVurdering => {
  return {
    status: "AVVENT",
    internUuid: "77322357",
    createdAt: pastDateAsString(dagerSidenHendelse),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
  };
};

const forhaandsvarselVurdering = (
  dagerSidenHendelse: number,
): AktivitetskravVurdering => {
  return {
    status: "FORHANDSVARSEL",
    internUuid: "457474547547",
    createdAt: pastDateAsString(dagerSidenHendelse),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
    journalpostId: "123",
    fristDato: addDaysToDate(new Date(), 14).toISOString(),
    document: forhaandsvarselDocumentMock,
  };
};

const forhaandsvarselVurderingWithoutDocument = (
  dagerSidenHendelse: number,
): AktivitetskravVurdering => {
  return {
    status: "FORHANDSVARSEL",
    internUuid: "1231231313",
    createdAt: pastDateAsString(dagerSidenHendelse),
    sistVurdert: pastDateAsString(dagerSidenHendelse),
    journalpostId: null,
    fristDato: addDaysToDate(new Date(), 14).toISOString(),
    document: null,
  };
};

const forhaandsvarselFixtureWithoutDocument: AktivitetskravVurdering[] = [
  nyKandidatVurdering(30),
  avventVurdering(25),
  forhaandsvarselVurderingWithoutDocument(10),
];

const nyKandidatFixture: AktivitetskravVurdering[] = [nyKandidatVurdering(12)];

const unntakFixture: AktivitetskravVurdering[] = [
  nyKandidatVurdering(33),
  avventVurdering(24),
  forhaandsvarselVurdering(15),
  unntakVurdering(4),
];

const oppfyltFixture: AktivitetskravVurdering[] = [
  nyKandidatVurdering(28),
  avventVurdering(21),
  forhaandsvarselVurdering(15),
  oppfyltVurdering(1),
];

const ikkeOppfyltFixture: AktivitetskravVurdering[] = [
  nyKandidatVurdering(14),
  avventVurdering(7),
  forhaandsvarselVurdering(4),
  ikkeOppfyltVurdering(1),
];

const ikkeAktuellFixture: AktivitetskravVurdering[] = [
  nyKandidatVurdering(29),
  avventVurdering(28),
  forhaandsvarselVurdering(20),
  ikkeAktuellVurdering(13),
];

const forhaandsvarselFixture: AktivitetskravVurdering[] = [
  nyKandidatVurdering(28),
  avventVurdering(21),
  forhaandsvarselVurdering(11),
];

const fixtures = {
  forhaandsvarselFixture,
  forhaandsvarselFixtureWithoutDocument,
  nyKandidatFixture,
  unntakFixture,
  ikkeAktuellFixture,
  ikkeOppfyltFixture,
  oppfyltFixture,
};

export default fixtures;
