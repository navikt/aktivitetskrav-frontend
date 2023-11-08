import { literal, object, string, z } from "zod";

const documentComponentType = z.union([
  literal("HEADER_H1"),
  literal("HEADER_H2"),
  literal("HEADER_H3"),
  literal("PARAGRAPH"),
  literal("BULLET_POINTS"),
  literal("LINK"),
]);

export const documentComponentSchema = object({
  type: documentComponentType,
  key: z.string().nullish(),
  title: string().datetime(),
  texts: z.array(z.string()),
});

export type DocumentComponent = z.infer<typeof documentComponentSchema>;
export type DocumentComponentType = z.infer<typeof documentComponentType>;
