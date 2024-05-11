import { RequestMethod } from '../enums/requestMethod.enum';

interface PrefixType {
  [name: string]: any;
}

export interface RequestOptions {
  method: RequestMethod;
  headers: PrefixType;
  body?: string;
}
