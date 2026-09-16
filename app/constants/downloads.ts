import { Monitor, Smartphone, Apple, Globe } from "lucide-react";
import type { SupportedOS, PlatformDownloads } from "../types/onboarding";

export const DOWNLOAD_DATA: Record<SupportedOS, PlatformDownloads> = {
  windows: {
    title: "Windows",
    icon: Monitor,
    options: [
      { label: "EXE Інсталятор", format: ".exe", arch: "x64 / ARM64", status: "available" },
      { label: "Portable", format: ".zip / .exe", arch: "x64 / ARM64", status: "available" },
      { label: "MSI (для корпоративного розгортання)", format: ".msi", arch: "x64 / ARM64", status: "available" },
      { label: "Microsoft Store", format: "AppX", status: "coming_soon" },
    ],
  },
  linux: {
    title: "Linux",
    icon: Monitor,
    options: [
      { label: "AppImage", format: ".AppImage", arch: "x64 / ARM64", status: "available" },
      { label: "Portable", format: ".tar.gz", arch: "x64 / ARM64", status: "available" },
      { label: "Flatpak", format: "Flathub", status: "coming_soon" },
    ],
  },
  // mac: {
  //   title: "macOS",
  //   icon: Apple,
  //   options: [
  //     { label: "DMG Інсталятор", format: ".dmg", arch: "Universal (Intel / Apple Silicon)", status: "coming_soon"},
  //   ],
  // },
  // android: {
  //   title: "Android",
  //   icon: Smartphone,
  //   options: [
  //     { label: "Direct APK", format: ".apk", status: "coming_soon" },
  //     { label: "Google Play Store", format: "Store", status: "coming_soon" },
  //   ],
  // },
  // ios: {
  //   title: "iOS",
  //   icon: Smartphone,
  //   options: [
  //     { label: "App Store", format: "App Store", status: "coming_soon" },
  //   ],
  // },
  unknown: {
    title: "Веб версія",
    icon: Globe,
    options: [],
  },
};