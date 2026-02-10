import { DeviceType } from "./DeviceType";

export interface PortfolioView {
  id: string;
  page: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  country?: string;
  deviceType: DeviceType;
  viewedAt: string;
}

