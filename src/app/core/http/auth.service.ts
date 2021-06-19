import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../view/model/user";
import {map} from "rxjs/operators";
import {Role} from "../../view/model/role";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUserSubject:BehaviorSubject<User | null>
  public loggedInUser: Observable<any> | null;

  constructor(private httpClient: HttpClient) {
    let u:User = JSON.parse(<string>localStorage.getItem('loggedInUser'));
    this.loggedUserSubject = new BehaviorSubject<User | null>(u);
    this.loggedInUser = this.loggedUserSubject.asObservable();
  }

  login(Object: any) {
    const Headers = new HttpHeaders('Access-Control-Allow-Origin: *')
    return this.httpClient.post<User>("api/auth/login", Object, {headers: Headers})
      .pipe(map (response => {
        this.getUserRole(response.token)
        localStorage.setItem("loggedInUser", JSON.stringify(response))
        return response;
      }))
  }

  private getUserRole(token:string) {
    const Headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', token);
    return this.httpClient.get<Role>("api/user", {headers: Headers}).subscribe(response => {
      let u:User = JSON.parse(<string>localStorage.getItem('loggedInUser'));
      u.role = response.userRole;
      localStorage.removeItem('loggedInUser');
      localStorage.setItem('loggedInUser', JSON.stringify(u))
      return response
    });
  }

  register(Object: any) {
    const Headers = new HttpHeaders('Access-Control-Allow-Origin: *')
    return this.httpClient.post("api/user/register", Object, {headers: Headers})
  }

  logoutUser() {
    localStorage.removeItem('loggedInUser')
    this.loggedUserSubject.next(null)
  }

  public loggedInUserValue(){
    return this.loggedUserSubject.value;
  }
}
