import { DocumentComponent } from "@/schema/documentComponentSchema";

interface Props {
  journalpostId?: String;
  sistVurdert: String;
  fristDato: String;
  dokument?: DocumentComponent[] | null;
}

export const ForhandsvarselComponent = ({
  journalpostId,
  sistVurdert,
  fristDato,
  dokument,
}: Props) => {
  return (
    <div>
      <div>{journalpostId}</div>
      <div>{sistVurdert}</div>
      <div>{fristDato}</div>
      <div>{dokument?.map(d => d.title)}</div>
    </div>
  );
};
