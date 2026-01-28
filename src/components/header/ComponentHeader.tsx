import {
  CheckmarkCircleFillIcon,
  ExclamationmarkTriangleFillIcon,
  InformationSquareFillIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import { getShortDateFormat } from "@/utils/dateUtils";
import styles from "./componentheader.module.css";

interface Props {
  headerText: string;
  alertStyle: "info" | "success" | "warning" | "error";
  utsendtDato?: string | null;
}

export const ComponentHeader = ({
  headerText,
  alertStyle,
  utsendtDato,
}: Props) => {
  return (
    <div className="mb-4">
      <div className="flex flex-row mb-4 space-between">
        <Heading size="large" level="1">
          {headerText}
        </Heading>
        <>
          {alertStyle === "info" && (
            <InformationSquareFillIcon
              aria-hidden
              className={styles.infoIcon}
            />
          )}
          {alertStyle === "warning" && (
            <ExclamationmarkTriangleFillIcon
              aria-hidden
              className={styles.warningIcon}
            />
          )}
          {alertStyle === "success" && (
            <CheckmarkCircleFillIcon
              aria-hidden
              className={styles.successIcon}
            />
          )}
          {alertStyle === "error" && (
            <XMarkOctagonFillIcon aria-hidden className={styles.errorIcon} />
          )}
        </>
      </div>

      {utsendtDato && (
        <BodyLong textColor="subtle">
          Utsendt {getShortDateFormat(utsendtDato)}
        </BodyLong>
      )}
    </div>
  );
};
