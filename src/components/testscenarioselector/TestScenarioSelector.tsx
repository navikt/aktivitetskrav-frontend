import { Button, Modal, Radio, RadioGroup } from "@navikt/ds-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ForhandsvarselTestScenario,
  getTestScenario,
  IkkeAktuellTestScenario,
  InfoSideTestScenario,
  InnstillingOmStansTestScenario,
  OppfyltTestScenario,
  setTestScenario,
  type TestScenario,
  UnntakTestScenario,
} from "@/utils/testScenarioUtils";
import SunImage from "../../../public/sun.svg";
import styles from "./testscenarioselector.module.css";

export const TestScenarioSelector = () => {
  const [open, setOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<
    TestScenario | undefined
  >();

  useEffect(() => {
    setSelectedScenario(getTestScenario());
  }, []);

  if (!selectedScenario) return null;

  return (
    <>
      <Modal
        open={open}
        aria-label="Testdatavelger"
        onClose={() => setOpen(false)}
        header={{
          heading: "Velg testscenario",
        }}
      >
        <Modal.Body>
          <div className="mb-4">
            <RadioGroup
              legend="Velg testscenario"
              value={selectedScenario}
              hideLegend={true}
              onChange={(val: TestScenario) => {
                setSelectedScenario(val);
              }}
            >
              <Radio value={InfoSideTestScenario}>Ny kandidat</Radio>
              <Radio value={ForhandsvarselTestScenario}>Forhåndsvarsel</Radio>
              <Radio value={IkkeAktuellTestScenario}>Ikke aktuell</Radio>
              <Radio value={InnstillingOmStansTestScenario}>
                Innstilling om stans
              </Radio>
              <Radio value={UnntakTestScenario}>Unntak</Radio>
              <Radio value={OppfyltTestScenario}>Oppfylt</Radio>
            </RadioGroup>
          </div>

          <div>
            <Button
              id="VelgScenarioButton"
              variant={"primary"}
              // disabled={!setActiveTestScenario}
              onClick={() => {
                setTestScenario(selectedScenario);
                window.location.reload();
              }}
            >
              Velg scenario
            </Button>
            <Button variant={"tertiary"} onClick={() => setOpen(false)}>
              Avbryt
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <button
        type="button"
        id="TestScenarioSelector"
        onClick={() => setOpen(!open)}
        className={styles.testscenariocontainer}
        aria-label="Åpne testscenariovelger"
      >
        <Image src={SunImage} alt="" width={40} height={40} />
      </button>
    </>
  );
};
