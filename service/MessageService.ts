
export const MessageService=(response:{message?:string})=>{
    if(response.message && typeof response.message == 'string'){
     return response.message
    }
    else{
     return 'Something went wrong!'
    }
 }