

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
    caseID: string;
    caseDescription: string;
    status: string;
 
  }

  export interface CustomContent {
    caseCategory: string;
    district: string;
    link: string;
  }