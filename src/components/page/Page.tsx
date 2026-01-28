import { Link } from "@navikt/ds-react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Page = ({ children }: Props) => {
  return (
    <>
      <div className="flex flex-col items-center bg-ds-gray-50">
        {children}

        <Link
          className="flex self-center my-8"
          href={process.env.NEXT_PUBLIC_MIN_SIDE_URL}
        >
          Naviger til Min side
        </Link>
      </div>
    </>
  );
};
