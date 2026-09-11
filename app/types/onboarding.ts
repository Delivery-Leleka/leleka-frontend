export type SupportedOS = "windows" | "linux" | "mac" | "android" | "ios" | "unknown";

export interface ProfileData {
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string | null;
}

export interface DownloadOption {
  label: string;
  format: string;
  arch?: string;
  status: "available" | "coming_soon";
  note?: string;
}

export interface PlatformDownloads {
  title: string;
  icon: React.ElementType;
  options: DownloadOption[];
}