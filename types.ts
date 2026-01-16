
export enum UserRole {
  SUAMI = 'Suami',
  ISTRI = 'Istri'
}

export interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface SafetyStatus {
  isSafe: boolean;
  message: string;
  updatedAt: number;
}

export interface LoveNote {
  text: string;
  author: string;
}
