import { loginUser } from "@/utils/urlUtils";
import {
  ForhandsvarselTestScenario,
  getTestScenario,
} from "@/utils/testScenarioUtils";

const testScenarioHeaders = (): Record<string, string> | undefined => {
  if (
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "local" ||
    process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "demo"
  ) {
    const headers: Record<string, string> = {
      testscenario: getTestScenario() || ForhandsvarselTestScenario,
    };

    return headers;
  }
};

export const get = async <ResponseData>(
  path: string,
): Promise<ResponseData> => {
  const response = await fetch(path, {
    method: "GET",
    credentials: "include",
    headers: testScenarioHeaders(),
  });

  if (response.status === 401) {
    loginUser();
  }

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status} ${response.statusText} - ${response.url}`,
    );
  }

  return await response.json();
};

export const post = async (path: string) => {
  const response = await fetch(path, {
    method: "POST",
    credentials: "include",
  });

  if (response.status === 401) {
    return loginUser();
  }

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status} ${response.statusText} - ${response.url}`,
    );
  }

  return await response.json();
};
