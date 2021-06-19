import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/http/auth.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private AuthService: AuthService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  logout() {
    this.AuthService.logoutUser();
    this.cdr.detectChanges()
  }

  check() {
    return this.AuthService.loggedInUserValue() === null;
  }

  isAdmin() {
    return this.AuthService.loggedInUserValue()?.role === 'ADMIN';
  }
}
