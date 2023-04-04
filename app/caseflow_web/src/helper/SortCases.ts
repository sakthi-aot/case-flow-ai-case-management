import { RecentCase, SortValue } from "../interfaces/componentInterface";

export const SortCasesByField = (key: SortValue, dataValue: any) => {
  const newDataArray = [...[dataValue]];
  let sortOrder = key.sortOrder ? "asc" : "desc";
  let orderedData = newDataArray.sort(compareValues(key.value, sortOrder));
  return orderedData;
};
const compareValues = (key: string, order: string) => {
  return function innerSort(a: RecentCase, b: RecentCase) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    const firstval = a[key as keyof typeof a];
    const secVal = b[key as keyof typeof b];
    let comparison = 0;

    if (typeof firstval === "string" || typeof secVal === "string") {
      comparison = firstval.localeCompare(secVal);
      return order === "desc" ? comparison * -1 : comparison;
    }
    if (firstval > secVal) {
      comparison = 1;
    } else if (firstval < secVal) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};
