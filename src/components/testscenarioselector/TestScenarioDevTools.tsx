import {
  getTestScenario,
  InfoSideTestScenario,
  setTestScenario,
} from "@/utils/testScenarioUtils";
import { TestScenarioSelector } from "./TestScenarioSelector";

export const TestScenarioDevTools = () => {
  if (
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "local" ||
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "demo"
  ) {
    const hasActiveScenario = !!getTestScenario();
    if (!hasActiveScenario) {
      setTestScenario(InfoSideTestScenario);
    }

    return <TestScenarioSelector />;
  }
  return null;
};
