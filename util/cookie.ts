 import { cookies } from 'next/headers'
export const GetCookie=()=>{
  if(cookies().get('user_auth')){
    return `${cookies().get('user_auth')?.name}=${cookies().get('user_auth')?.value}`;
  }
  else{
    return '';
  }
}