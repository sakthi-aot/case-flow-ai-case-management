

export interface EachTask{
  taskID:number,
  taskDescription : string
}

export interface SearchProps{
    dropDownArray : string[],
    setSearchField :React.Dispatch<React.SetStateAction<string>>,
    setSearchColumn : React.Dispatch<React.SetStateAction<string>>
  
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
    description:string,
    creationdate:string,
    modificationdate:string
  }