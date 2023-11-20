import { literal, object, string, union, z } from "zod";
import { documentComponentSchema } from "@/schema/documentComponentSchema";

const VurderingStatusSchema = z.union([
  literal("UNNTAK"),
  literal("OPPFYLT"),
  literal("NY"),
  literal("NY_VURDERING"),
  literal("AVVENT"),
  literal("FORHANDSVARSEL"),
  literal("IKKE_OPPFYLT"),
  literal("IKKE_AKTUELL"),
]);

const unntakArsaker = z.union([
  literal("MEDISINSKE_GRUNNER"),
  literal("TILRETTELEGGING_IKKE_MULIG"),
  literal("SJOMENN_UTENRIKS"),
]);

const oppfyltArsaker = z.union([
  literal("FRISKMELDT"),
  literal("GRADERT"),
  literal("TILTAK"),
]);

export const BaseVurdering = object({
  status: VurderingStatusSchema,
  createdAt: string().datetime(),
  vurderingUuid: string(),
});

export const UnntakSchema = BaseVurdering.extend({
  status: z.literal("UNNTAK"),
  arsaker: z.array(unntakArsaker),
  sistVurdert: string().datetime(),
});

export const OppfyltSchema = BaseVurdering.extend({
  status: z.literal("OPPFYLT"),
  arsaker: z.array(oppfyltArsaker),
  sistVurdert: string().datetime(),
});

export const NySchema = BaseVurdering.extend({
  status: z.literal("NY"),
  sistVurdert: string().datetime().nullish(),
});

export const NyVurderingSchema = BaseVurdering.extend({
  status: z.literal("NY_VURDERING"),
  sistVurdert: string().datetime().nullish(),
});

export const AvventSchema = BaseVurdering.extend({
  status: z.literal("AVVENT"),
  sistVurdert: string().datetime(),
});

export const ForhandsvarselSchema = BaseVurdering.extend({
  status: z.literal("FORHANDSVARSEL"),
  journalpostId: string().nullish(),
  sistVurdert: string().datetime(),
  fristDato: string().datetime(),
  document: z.array(documentComponentSchema).nullable(),
});

export const IkkeOppfyltSchema = BaseVurdering.extend({
  status: z.literal("IKKE_OPPFYLT"),
  sistVurdert: string().datetime(),
});

export const IkkeAktuellSchema = BaseVurdering.extend({
  status: z.literal("IKKE_AKTUELL"),
  sistVurdert: string().datetime(),
});

export const aktivitetskravVurderingSchema = union([
  UnntakSchema,
  OppfyltSchema,
  NySchema,
  NyVurderingSchema,
  AvventSchema,
  ForhandsvarselSchema,
  IkkeOppfyltSchema,
  IkkeAktuellSchema,
]);

export type AktivitetskravVurdering = z.infer<
  typeof aktivitetskravVurderingSchema
>;

export type Unntak = z.infer<typeof UnntakSchema>;
export type Oppfylt = z.infer<typeof OppfyltSchema>;
export type Ny = z.infer<typeof NySchema>;
export type NyVurdering = z.infer<typeof NyVurderingSchema>;
export type Avvent = z.infer<typeof AvventSchema>;
export type Forhandsvarsel = z.infer<typeof ForhandsvarselSchema>;
export type IkkeOppfylt = z.infer<typeof IkkeOppfyltSchema>;
export type IkkeAktuell = z.infer<typeof IkkeAktuellSchema>;
export type UnntakArsaker = z.infer<typeof unntakArsaker>;
export type OppfyltArsaker = z.infer<typeof oppfyltArsaker>;
