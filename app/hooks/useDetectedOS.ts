import { useState, useEffect } from "react";
import type { SupportedOS } from "~/types/onboarding";

export const useDetectedOS = (): SupportedOS => {
  const [detectedOS, setDetectedOS] = useState<SupportedOS>("unknown");

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDetectedOS("ios");
    } else if (userAgent.includes("android")) {
      setDetectedOS("android");
    } else if (userAgent.includes("mac")) {
      setDetectedOS("mac");
    } else if (userAgent.includes("win")) {
      setDetectedOS("windows");
    } else if (userAgent.includes("linux")) {
      setDetectedOS("linux");
    } else {
      setDetectedOS("unknown");
    }
  }, []);

  return detectedOS;
};