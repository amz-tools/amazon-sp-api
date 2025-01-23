import type {Timeouts} from './baseTypes';

export interface IReqOptions {
  version?: string;
  restore_rate?: number;
  raw_result?: boolean;
  timeouts?: Timeouts;
}
