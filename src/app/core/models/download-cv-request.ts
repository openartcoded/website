export interface DownloadCvRequest {
  email: string;
  id?: string;
  phoneNumber?: string;
  htmlContent?: string;
  dailyRate?: boolean;
  availability?: boolean;
  dateReceived?: Date;
}
