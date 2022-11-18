

export const SortCasesByField = (key,dataValue) =>{

//newDataArray array is to make a copy of incoming datavalue 
// because someetimes we may pass State value as dataValue which may result in state mutataion

const newDataArray = [].concat(dataValue)
let sortOrder = key.sortOrder? "asc" : "desc"     
let orderedDate = newDataArray.sort(compareValues(key.value,sortOrder))
return orderedDate
}
const compareValues = (key ,order ) =>{  
    return function innerSort(a,b){
        if(!a.hasOwnProperty (key) || !b.hasOwnProperty (key)){
             // property doesn't exist on either object
            return 0;
        }        
        const firstval =  a[key]
        const secVal =  b[key] 
        let comparison =0;      

        if((typeof firstval === 'string') || (typeof secVal === 'string') ){            
            comparison = firstval.localeCompare(secVal);
            return ( (order==="desc") ? (comparison * -1) : comparison)
        }  
        if(firstval > secVal){
            comparison=1;
        }else if(firstval < secVal){
            comparison =-1
        }
        return(
            (order==="desc") ? (comparison * -1) : comparison
        )
    }
}   