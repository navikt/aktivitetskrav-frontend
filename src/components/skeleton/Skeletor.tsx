import { Skeleton } from "@navikt/ds-react";
import type { SkeletonProps } from "@navikt/ds-react/src/skeleton/Skeleton";

interface Props extends SkeletonProps {
  displaySkeleton: boolean;
}

export const Skeletor = ({ displaySkeleton, children }: Props) => {
  if (displaySkeleton) {
    return <Skeleton>{children}</Skeleton>;
  }
  return children;
};
