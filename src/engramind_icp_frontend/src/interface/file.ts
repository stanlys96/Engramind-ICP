export interface FileResponse {
  jobStatus: string;
  message: string;
  processedId: string;
  file_id: string;
  file_type: string;
  filename: string;
  metadata: any;
  organization_id: any;
  status: string;
  created_at: string;
}

export interface FileJobResponse {
  statusCode: number;
  jobId: string;
  jobStatus: string;
  progress: number;
  result: FileJobResult;
  failedReason: any;
}

export interface FileJobResult {
  jobStatus: string;
  message: string;
  processedId: string;
  file_id: string;
  file_type: string;
  filename: string;
  metadata: any;
  organization_id: string;
  status: string;
}

export interface DeleteFileJobResponse {
  statusCode: number;
  jobId: string;
  jobStatus: string;
  progress: number;
  result: DeleteFileJobResult;
  failedReason: any;
}

export interface DeleteFileJobResult {
  jobStatus: string;
  message: string;
  processedId: string;
  status: string;
}
