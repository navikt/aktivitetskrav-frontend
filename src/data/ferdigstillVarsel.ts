import { post } from "@/data/api";

export const ferdigstillVarsel = () => {
  const ferdigstiltSessionStorageKey = "ferdigstilt-forhandsvarsel";
  const hasAlreadyFerdigstilt = sessionStorage.getItem(
    ferdigstiltSessionStorageKey,
  );
  if (!hasAlreadyFerdigstilt) {
    post(`${process.env.NEXT_PUBLIC_ESYFO_PROXY_API_URL!}/les`);
    sessionStorage.setItem(ferdigstiltSessionStorageKey, "true");
  }
};
