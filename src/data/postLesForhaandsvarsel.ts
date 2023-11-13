export async function postLesForhaandsvarsel(): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ESYFO_PROXY_API_URL}/les`,
    { method: "POST" },
  );

  if (!res.ok) {
    throw new Error("Failed to call postLesForhaandsvarsel");
  }
}
