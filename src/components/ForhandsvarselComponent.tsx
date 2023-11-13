import { DocumentComponent } from "@/schema/documentComponentSchema";
import { BodyLong, Heading, Link } from "@navikt/ds-react";
import { Page } from "@/components/page/Page";
import { useEffect } from "react";
import { post } from "@/data/api";

interface Props {
  journalpostId?: String;
  sistVurdert: String;
  fristDato: String;
  document?: DocumentComponent[] | null;
}

export const ForhandsvarselComponent = ({
  journalpostId,
  sistVurdert,
  fristDato,
  document,
}: Props) => {
  useEffect(() => {
    post(`${process.env.NEXT_PUBLIC_ESYFO_PROXY_API_URL!}/les`);
  }, []);

  return (
    <Page headerText="Varsel om stans av sykepenger">
      {/*<div>{fristDato}</div>*/}

      <div className="flex flex-col gap-4">
        {document?.map((d) => {
          switch (d.type) {
            case "HEADER_H1":
              return null;
            // (
            //   <div>
            //     {d.texts.map((text, index) => (
            //       <Heading size="xlarge" level="1" key={index}>
            //         {text}
            //       </Heading>
            //     ))}
            //   </div>
            // );
            case "HEADER_H2":
              return (
                <div className="mt-4">
                  {d.texts.map((text, index) => (
                    <Heading size="large" level="2" key={index}>
                      {text}
                    </Heading>
                  ))}
                </div>
              );
            case "HEADER_H3":
              return (
                <div className="mt-4">
                  {d.texts.map((text, index) => (
                    <Heading size="medium" level="3" key={index}>
                      {text}
                    </Heading>
                  ))}
                </div>
              );
            case "LINK":
              return (
                <div>
                  {d.title && (
                    <Heading size="xsmall" level="3" spacing>
                      {d.title}
                    </Heading>
                  )}
                  {d.texts.map((text, index) => (
                    <Link className="break-words" key={index} href={text}>
                      {text}
                    </Link>
                  ))}
                </div>
              );
            case "BULLET_POINTS":
              <div>TODO</div>;
            case "PARAGRAPH":
              return (
                <div>
                  {d.title && (
                    <Heading size="xsmall" level="3" spacing>
                      {d.title}
                    </Heading>
                  )}
                  {d.texts.map((text, index) => (
                    <BodyLong key={index}>{text}</BodyLong>
                  ))}
                </div>
              );
          }
        })}
      </div>
    </Page>
  );
};
