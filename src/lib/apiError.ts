interface ApiErrorBody {
  message?: unknown;
  data?: {
    message?: unknown;
  };
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (typeof error !== "object" || error === null || !("data" in error)) {
    return fallback;
  }

  const body = (error as { data?: ApiErrorBody }).data;
  if (typeof body?.message === "string" && body.message.trim()) {
    return body.message;
  }
  if (typeof body?.data?.message === "string" && body.data.message.trim()) {
    return body.data.message;
  }

  return fallback;
}
