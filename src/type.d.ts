
import { Document } from 'mongoose';

export type Action = {
    trx_id: string;
    block_time: string;
    block_num: number;
}

export type ActionTrace = {
    action_trace: IAction;
}

export interface IGetActionsResponse {
    actions: ActionTrace[];
}

export interface IActionData extends Document {
    trx_id: string;
    block_time: string;
    block_num: number;
}
