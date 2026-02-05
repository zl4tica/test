import FingerprintJS, { type Agent } from "@fingerprintjs/fingerprintjs";

let cachedFingerprint: string | null = null;

export const getDeviceFingerprint = async (): Promise<string> => {
  if (cachedFingerprint) return cachedFingerprint;

  const stored = localStorage.getItem("device_fingerprint");
  if (stored) {
    cachedFingerprint = stored;
    return cachedFingerprint;
  }

  const fp: Agent = await FingerprintJS.load();
  const result = await fp.get();
  cachedFingerprint = result.visitorId;
  localStorage.setItem("device_fingerprint", cachedFingerprint);
  return cachedFingerprint;
};
