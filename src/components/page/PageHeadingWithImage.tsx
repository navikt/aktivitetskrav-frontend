import Image from "next/image";
import { Heading } from "@navikt/ds-react";
import React from "react";
import medarbeidsgiver from "../../../public/med_arbeidsgiver.svg";
import utenarbeidsgiver from "../../../public/uten_arbeidsgiver.svg";
import { MedUtenAGVisning } from "@/components/AktivitetskravInfoComponent";

interface Props {
  headerText: string;
  image: MedUtenAGVisning;
}

export const PageHeadingWithImage = ({ headerText, image }: Props) => {
  return (
    <div className="flex flex-row bg-header-color p-8 items-center justify-center gap-8 md:pr-48">
      {image && (
        <div className="border-solid border-2 border-white p-2 w-32 hidden md:flex">
          <Image
            src={
              image === "MED_ARBEIDSGIVER" ? medarbeidsgiver : utenarbeidsgiver
            }
            alt="Kommunikasjon om aktivitetskravet"
            width={128}
            height={128}
          />
        </div>
      )}
      <Heading size="xlarge" level="1">
        {headerText}
      </Heading>
    </div>
  );
};