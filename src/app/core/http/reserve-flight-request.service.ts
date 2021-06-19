import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {SeatCode} from "../../view/model/seat-code";
import {BorderPass} from "../../view/model/border-pass";

@Injectable({
  providedIn: 'root'
})
export class ReserveFlightRequestService {

  constructor(private httpClient: HttpClient,
              private auth: AuthService) {
  }

  public findAvailableSeatCodes(flightId: any, flightType: any) {
    const Headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
    let url = "/api/flights/" + flightId + "/seat-codes";
    const Params = new HttpParams()
      .set("flightType", flightType);
    console.log(Params);
    return this.httpClient.get<SeatCode>(url, {headers: Headers, params: Params})
  }

  public reserve(form: any) {
    let Headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    let isLogged = this.auth.loggedInUserValue() === null;
    if (!isLogged) {
      Headers = Headers.set('Authorization', <string>this.auth.loggedInUserValue()?.token);
    }
    return this.httpClient.post<BorderPass>("/api/tourists/reserve", form, {headers: Headers});
  }
}
