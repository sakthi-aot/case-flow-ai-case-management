import { Cases } from './cases.entity';
export declare class Document {
    id: number;
    caseid: number;
    documentref?: string;
    desc: string;
    addedbyuserid?: string;
    latestversion?: string;
    content: string;
    contenttype: string;
    creationuser: string;
    downloadurl: string;
    documentid: number;
    dms_provider: number;
    dms_provider1: number;
    cases: Cases;
}
