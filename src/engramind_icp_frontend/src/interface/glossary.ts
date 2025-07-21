export interface GlossaryResponse {
  statusCode: number;
  jobId: string;
  jobStatus: string;
  progress: number;
  result: GlossaryResult;
  failedReason: any;
}

export interface GlossaryResult {
  jobStatus: string;
  message: string;
  processedId: string;
  code: number;
  is_success: boolean;
  data: GlossaryData;
}

export interface GlossaryData {
  glossary: string;
  id: string;
  name: string;
  organization_id: any;
  timestamp: string;
  user_id: number;
}
