'use client'

import Cookies from 'js-cookie';

export const getClientCookie= () : string=>{
  if(Cookies.get('user_auth')){
    return Cookies.get('user_auth') as string;
  }
  else{
    return '';
  }
}

