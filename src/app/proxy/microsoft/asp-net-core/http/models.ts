export interface IFormFile {
  contentType?: string;
  contentDisposition?: string;
  headers: Record<string, string[]>; // Replace StringValues with string[]
  length: number;
  name?: string;
  fileName?: string;
}
