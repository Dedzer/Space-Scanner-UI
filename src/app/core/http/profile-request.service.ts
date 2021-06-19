import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {UserFlights} from "../../view/model/user-flights";

@Injectable({
  providedIn: 'root'
})
export class ProfileRequestService {

  constructor(private httpClient: HttpClient,
              private auth: AuthService) {
  }


  public findUserFlights() {
    const Headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', <string>this.auth.loggedInUserValue()?.token);
    return this.httpClient.get("api/flights/user", {headers: Headers})
  }

  public changePassword(form: any) {
    const Headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', <string>this.auth.loggedInUserValue()?.token);
    return this.httpClient.put<any>("api/user/password", form, {headers: Headers})
  }
}
