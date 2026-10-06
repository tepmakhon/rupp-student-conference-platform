const privateFields = new Set(["passwordHash", "password", "refreshToken"]);

// A single response boundary also protects nested users in applicants and audit logs.
export const responseReplacer = (key: string, value: unknown) => {
  if (privateFields.has(key)) return undefined;
  return typeof value === "bigint" ? value.toString() : value;
};
