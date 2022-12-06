export interface State {
  auth: Auth
  Application: Application
  document: Document
  Cases: Cases
}

export interface Auth {
    token: string;
    roles: string;
    userDetails: USerDetails,
    isAuthenticated: boolean;
  };

  export interface Application {
    isShowLoader: boolean;
  };

  export interface Document {
    documentsList: never[];
    seletedDocument: null;
  };

  export interface SelectedCase {
    id: number;
    name: string;
    description: string;
    status: string;
  };

  export interface CaseList{
    id: number;
    name: string;
    description: string;
    status: string;
  }[];

  export interface Cases {
    selectedCase: SelectedCase
    caseList: CaseList
  }
  export interface USerDetails {
    
        email: string;
        userName: string;
      
  }
