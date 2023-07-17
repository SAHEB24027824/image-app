export const formatSlugAndKey = (value:string,replaceWith="-")=>{
    let formattedValue = value.replace(/[^A-Z0-9]+/ig, replaceWith).toLowerCase();
    return formattedValue;
  }