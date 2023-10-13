import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { apiUrls } from '../api.urls'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient)

  registerService = (registerObj: any) => {
    console.log(`${apiUrls.authServiceApi}register`)

    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj)
  }

  loginService = (loginObj: any) => {
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj)
  }

  forgotPassword = (forgetPassObj: any) => {
    return this.http.post<any>(
      `${apiUrls.authServiceApi}send-email`,
      forgetPassObj
    )
  }

  resetPassword = (resetObj: any) => {
    console.log(`${apiUrls}reset-password`)

    return this.http.post<any>(
      `${apiUrls.authServiceApi}reset-password`,
      resetObj
    )
  }
}
