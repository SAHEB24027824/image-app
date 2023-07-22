export const HtmlToText = (html:string)=>{
      var divContainer= document.createElement("div");
      divContainer.innerHTML = html;
      return divContainer.textContent || divContainer.innerText || "";
  }