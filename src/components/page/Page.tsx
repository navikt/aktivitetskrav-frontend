import React, { ReactNode } from "react";
import { PageHeadingWithImage } from "./PageHeadingWithImage";
import { PageHeading } from "./PageHeading";
import { MedUtenAGVisning } from "@/components/AktivitetskravInfoComponent";
import { Link } from "@navikt/ds-react";

interface Props {
  headerText: ReactNode;
  image?: MedUtenAGVisning;
  children: ReactNode;
}

export const Page = ({ headerText, image, children }: Props) => {
  return (
    <div className="mb-8">
      {image ? (
        <PageHeadingWithImage headerText={headerText} image={image} />
      ) : (
        <PageHeading headerText={headerText} />
      )}

      <div className="flex flex-col items-center p-8">
        <div className="flex flex-col max-w-3xl gap-8">
          {children}
          <Link
            className="flex self-center"
            href={process.env.NEXT_PUBLIC_MIN_SIDE_URL}
          >
            Naviger til Min side
          </Link>
        </div>
      </div>
    </div>
  );
};
