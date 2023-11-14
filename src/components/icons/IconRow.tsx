import CircledIcon from "./CircledIcon";
import React, { ReactElement } from "react";
import { Skeleton } from "@navikt/ds-react";

interface Props {
  icon: ReactElement;
  children: ReactElement;
  displaySkeleton?: boolean;
}
export const IconRow = ({ icon, displaySkeleton = false, children }: Props) => {
  return (
    <div className="flex flex-row gap-4">
      {displaySkeleton ? (
        <div>
          <Skeleton variant="circle" width={60} height={60} />
        </div>
      ) : (
        <CircledIcon className="hidden sm:flex" icon={icon} />
      )}
      {children}
    </div>
  );
};
