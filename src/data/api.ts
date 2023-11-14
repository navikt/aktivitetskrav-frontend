import { loginUser } from "@/utils/urlUtils";

export const get = async (path: string) => {
  const response = await fetch(path, {
    method: "GET",
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
