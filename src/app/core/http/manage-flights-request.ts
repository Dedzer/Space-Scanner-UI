import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Shuttle} from "../../view/model/shuttle";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ManageFlightsRequest {

  constructor(private httpClient: HttpClient,
              private auth: AuthService) {

  }


  public findShuttles() {
    const Headers = new HttpHeaders('Access-Control-Allow-Origin: *')
    return this.httpClient.get<Shuttle>("api/shuttle", {headers: Headers})
  }

  public createCharterFlight(form: any) {
    const Headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', <string>this.auth.loggedInUserValue()?.token);
    return this.httpClient.post("api/flights/charter", form, {headers: Headers})
  }
}
