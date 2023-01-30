import { RouterState } from "redux-first-history";
export interface State {
  auth: Auth;
  app: Application;
  documents: Document;
  cases: Cases;
  constants: Constants;
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
}

export interface SelectedCase {
  id: number;
  name: string;
  desc: string;
  statusid: number;
  lobDetails: any;
  documents: any[];
  totalDocCount:number;
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
  caseTypes: CaseTypes[];
}

export interface CaseTypes {
  id: number;
  casetypeid: number;
  name: string;
  displayname: string;
  code: string;
}
