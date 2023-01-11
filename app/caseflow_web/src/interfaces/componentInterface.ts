

export interface EachTask{
  taskID:number,
  taskDescription : string
}

export interface SearchProps{
    dropDownArray : string[],
    setSearchField :React.Dispatch<React.SetStateAction<string>>,
    setSearchColumn : React.Dispatch<React.SetStateAction<string>>
  
  }

  export interface RecentCase{
    case :Case
 
  }  

  export interface CustomContent {
    caseCategory: string;
    district: string;
    link: string;
  }

  export interface DocumentList {
    id: string;
    name: string;
    dms_provider: number;
    desc:string,
    creationdate:string,
    modificationdate:string,
    type:string
  }

  export interface SortValue{
    value: string;
    sortOrder: null | boolean;
  
  }
  export interface PropsConfig{
    title : string,
    count : number | string,
    isShowSort :boolean
  }
  export interface caseListprops{
    config:PropsConfig
  }
 
  export interface Case{
    id: number;
    name: string;
    description: string;
    status: string;
  };