import type { IFormFile } from '../../microsoft/asp-net-core/http/models';
import type { Status } from '../../enums/status.enum';

export interface CreateUpdateLanguageDto {
  name: string;
  code: string;
  image: IFormFile;
  status: Status;
}

export interface UpdateLanguagedto {
  id: number;
  name: string;
  code: string;
  image: IFormFile;
  status: Status;
}
