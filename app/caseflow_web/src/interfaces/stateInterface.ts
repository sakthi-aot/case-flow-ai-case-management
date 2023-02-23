import { RouterState } from "redux-first-history";
export interface State {
  auth: Auth;
  app: Application;
  documents: Document;
  cases: Cases;
  constants: Constants;
  lob:Lob;
  tasks: Tasks;
}

export type AuthState = {
  token: string;
  roles: string;
  userDetails: USerDetails;
  isAuthenticated: boolean;
};
export interface Auth {
  token: string;
  roles: string;
  userDetails: USerDetails;
  isAuthenticated: boolean;
}

export interface Application {
  isShowLoader: boolean;
  progressBarStatus: number;
}

export interface Document {
  documentsList: never[];
  seletedDocument: null;
  totalPageCount:1,
}

export interface SelectedCase {
  id: number;
  name: string;
  desc: string;
  statusid: number;
  lobDetails: any;
  documents: any[];
  totalDocCount:number;
  typeid : number;
  lobcaseid:number;
  tasks : any[];
  additionalFields : any;
}

export interface CaseList {
  id: number;
  name: string;
  description: string;
  status: string;
}
[];

export interface Cases {
  selectedCase: SelectedCase;
  caseList: CaseList[];
  totalCaseCount: number;
  pageSelected: number;
}
export interface USerDetails {
  email: string;
  userName: string;
}

export interface store {
  router: RouterState;
  auth: AuthState;
  documents: Document;
  app: Application;
  cases: Cases;
}

export interface Constants {
  caseStatuses: CaseStatuses[];
  caseTypes: CaseTypes[];
}

export interface CaseStatuses {
  id: number;
  casetypeid: number;
  name: string;
  displayname: string;
  code: string;
  lobcaseid : number;
}

export interface CaseTypes {
  id: number;
  name: string;
  displayname: string;
  code: number;
}
export interface Lob {
  lobList:LobList[],
  totalLobCount:number,
  pageSelected:number,
  selectedLob:LobList,
  editLob:boolean,
}
export interface LobList {
  id:number,
  sumAssured : number,
  policyNumber : string,
  createdDate :  Date ,
  isActive : string,
  policyExpiryDate:Date,
  policyEffectiveDate:Date,
  
}
export interface Tasks {
  userTasksList : any[];
}
