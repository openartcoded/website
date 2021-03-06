export interface FileUpload {
  id: string;
  metadata: FileUploadMetadata;
}

export interface FileUploadMetadata {
  contentType: string;
  originalFilename: string;
  name: string;
  size: number;
  creationDate: Date;
  publicResource: boolean;
  correlationId?: string;
}
