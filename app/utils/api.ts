import type { AuthResponse } from "~/model/AuthResponse";

const getApiBaseUrl = () => {
  const config = useRuntimeConfig();
  return config.public.apiBaseUrl;
};

export type FetchOptions = Omit<RequestInit, "method" | "body"> & {
  method?:
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "HEAD"
    | "OPTIONS"
    | "CONNECT"
    | "TRACE";
  body?: any; // <-- permet d’envoyer un objet directement
};

// === Avec auth ===
export const apiFetchAuth = async <T = any>(
  url: string,
  options: FetchOptions = {},
): Promise<T> => {
  const accessToken = useCookie("access_token");
  const refreshToken = useCookie("refresh_token");

  try {
    return await $fetch<T>(url, {
      ...options,
      method: options.method || "GET", // valeur par défaut
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${accessToken.value}`,
      },
    });
  } catch (err: any) {
    if (!refreshToken) throw err;

    try {
      const newTokens = await $fetch<AuthResponse>(
        `${getApiBaseUrl()}/user/refresh`,
        {
          method: "POST",
          body: { refresh_token: refreshToken.value },
        },
      );

      accessToken.value = newTokens.access_token;
      refreshToken.value = newTokens.refresh_token;

      return await $fetch<T>(url, {
        ...options,
        method: options.method || "GET",
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (err: any) {
      accessToken.value = null;
      refreshToken.value = null;

      navigateTo("/login");
      return Promise.reject(err);
    }
  }
};

// === Sans auth ===
export const apiFetchNoAuth = async <T = any>(
  url: string,
  options: FetchOptions = {},
): Promise<T> => {
  try {
    return await $fetch<T>(url, {
      ...options,
      method: options.method || "GET",
      headers: {
        ...(options.headers || {}),
      },
    });
  } catch (err) {
    console.error("Erreur API :", err);
    throw err;
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const accessTokenCookie = useCookie("access_token");
  const refreshTokenCookie = useCookie("refresh_token");
  if (!refreshTokenCookie.value) return null;

  try {
    const newTokens = await $fetch<AuthResponse>(
      `${getApiBaseUrl()}/user/refresh`,
      {
        method: "POST",
        body: { token: refreshTokenCookie.value },
      },
    );
    accessTokenCookie.value = newTokens.access_token;
    refreshTokenCookie.value = newTokens.refresh_token;
    return newTokens.access_token;
  } catch (err) {
    accessTokenCookie.value = null;
    refreshTokenCookie.value = null;
    navigateTo("/login");
    return null;
  }
};
