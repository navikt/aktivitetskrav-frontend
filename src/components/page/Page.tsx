import React, { ReactNode } from "react";
import { PageHeadingWithImage } from "./PageHeadingWithImage";
import { PageHeading } from "./PageHeading";
import { Link } from "@navikt/ds-react";
import { MedUtenAGVisning } from "@/components/view/AktivitetskravInfoComponent";

interface Props {
  headerText: ReactNode;
  image?: MedUtenAGVisning;
  children: ReactNode;
}

export const Page = ({ headerText, image, children }: Props) => {
  return (
    <>
      <div className="mb-4 px-8">
        {image ? (
          <PageHeadingWithImage headerText={headerText} image={image} />
        ) : (
          <PageHeading headerText={headerText} />
        )}
      </div>

      <div className="flex flex-col items-center md:bg-ds-gray-50">
        <div className="flex flex-col max-w-3xl gap-8 p-8 md:mt-8 mb-8 bg-white">
          {children}
          <Link
            className="flex self-center"
            href={process.env.NEXT_PUBLIC_MIN_SIDE_URL}
          >
            Naviger til Min side
          </Link>
        </div>
      </div>
    </>
  );
};
