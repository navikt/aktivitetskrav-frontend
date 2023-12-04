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
  forhaandsvarselVurderingWithoutDocument(10),
  avventVurdering(25),
  nyKandidatVurdering(30),
];

const nyKandidatFixture: AktivitetskravVurdering[] = [nyKandidatVurdering(12)];

const unntakFixture: AktivitetskravVurdering[] = [
  unntakVurdering(4),
  forhaandsvarselVurdering(15),
  avventVurdering(24),
  nyKandidatVurdering(33),
];

const oppfyltFixture: AktivitetskravVurdering[] = [
  oppfyltVurdering(1),
  forhaandsvarselVurdering(15),
  avventVurdering(21),
  nyKandidatVurdering(28),
];

const ikkeOppfyltFixture: AktivitetskravVurdering[] = [
  ikkeOppfyltVurdering(1),
  forhaandsvarselVurdering(4),
  avventVurdering(7),
  nyKandidatVurdering(14),
];

const ikkeAktuellFixture: AktivitetskravVurdering[] = [
  ikkeAktuellVurdering(13),
  forhaandsvarselVurdering(20),
  avventVurdering(28),
  nyKandidatVurdering(29),
];

const forhaandsvarselFixture: AktivitetskravVurdering[] = [
  forhaandsvarselVurdering(11),
  avventVurdering(21),
  nyKandidatVurdering(28),
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
