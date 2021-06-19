import {ChangeDetectorRef, Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {MatButtonToggleGroup} from "@angular/material/button-toggle";
import {AuthService} from "../../core/http/auth.service";
import {FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {timeout} from "rxjs/operators";

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.css'],
})
export class SignFormComponent implements OnInit {

  Form = {
    email: String,
    password: String
  }

  constructor(private AuthService: AuthService,
              private cdr: ChangeDetectorRef,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  isSignIn$ = false;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  signInPassword = new FormControl('', Validators.required)
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])
  confirmPassword = new FormControl('', Validators.required)
  successMessage: string | null = null;
  errorMessage: string | null = null;
  registerErrorMessage: string | null = null;

  checkPasswords() {
    if (this.password.value === this.confirmPassword.value) {
      this.confirmPassword.setErrors(null)
    } else {
      this.confirmPassword.setErrors({'match': true})
    }
  }

  getConfirmPasswordErrorMessage() {
    if (this.confirmPassword.hasError('required')) {
      return 'You must enter a value';
    }
    return 'Passwords does not match';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.password.hasError('pattern') ? 'upper case letter, ' +
      'lower case letter, ' +
      'digit, ' +
      'special character, ' +
      'minimum eight in length' : '';
  }

  getSignInPasswordErrorMessage() {
    if (this.signInPassword.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  toggle(group: MatButtonToggleGroup) {
    this.isSignIn$ = group.value == "true";
  }


  login() {
    this.Form.email = this.email.value;
    this.Form.password = this.signInPassword.value;
    this.AuthService.login(this.Form).subscribe(
      data => {
        this.errorMessage = null;
        this.router.navigate([''])
      },
      error => {
        this.errorMessage = 'Invalid credentials'
      }
    )
    this.cdr.detectChanges()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['red-snackbar'],
    });
  }

  register() {
    this.Form.email = this.email.value;
    this.Form.password = this.password.value;
    this.AuthService.register(this.Form).subscribe(
      () => {
        this.errorMessage = null;
        this.registerErrorMessage = null;
        this.successMessage = 'Registration successful! You can sign in now.'
      },
      () => {
        this.successMessage = null;
        this.errorMessage = 'User with provided email already exists!'
      }
    )
  }
}
