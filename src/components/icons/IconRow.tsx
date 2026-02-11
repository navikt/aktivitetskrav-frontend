import { Skeleton } from "@navikt/ds-react";
import type { ReactElement } from "react";
import CircledIcon from "./CircledIcon";

interface Props {
  icon: ReactElement;
  children: ReactElement;
  displaySkeleton?: boolean;
}
export const IconRow = ({ icon, displaySkeleton = false, children }: Props) => {
  return (
    <div className="flex flex-row gap-4">
      {displaySkeleton ? (
        <div className="sm:flex">
          <Skeleton variant="circle" width={60} height={60} />
        </div>
      ) : (
        <CircledIcon className="hidden sm:flex" icon={icon} />
      )}
      {children}
    </div>
  );
};
