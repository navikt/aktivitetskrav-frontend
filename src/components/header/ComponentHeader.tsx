import { BodyLong, Heading } from "@navikt/ds-react";
import React from "react";
import { getShortDateFormat } from "@/utils/dateUtils";
import {
  CheckmarkCircleFillIcon,
  ExclamationmarkTriangleFillIcon,
  InformationSquareFillIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
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
            <InformationSquareFillIcon className={styles.infoIcon} />
          )}
          {alertStyle === "warning" && (
            <ExclamationmarkTriangleFillIcon className={styles.warningIcon} />
          )}
          {alertStyle === "success" && (
            <CheckmarkCircleFillIcon className={styles.successIcon} />
          )}
          {alertStyle === "error" && (
            <XMarkOctagonFillIcon className={styles.errorIcon} />
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
