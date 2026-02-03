import type { SkeletonProps } from "@navikt/ds-react";
import { Skeleton } from "@navikt/ds-react";
import type { ReactNode } from "react";

interface Props extends SkeletonProps {
  displaySkeleton: boolean;
  children: ReactNode;
}

export const Skeletor = ({ displaySkeleton, children }: Props) => {
  if (displaySkeleton) {
    return <Skeleton>{children}</Skeleton>;
  }
  return children;
};
