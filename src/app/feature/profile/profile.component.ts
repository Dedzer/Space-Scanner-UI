import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProfileRequestService} from "../../core/http/profile-request.service";
import {Observable} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  borderPass: any;
  showBorderPass:boolean = false;
  flights$:Observable<any> | null = null;
  hide = true;
  signInPassword = new FormControl('', Validators.required)
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])
  confirmPassword = new FormControl('', Validators.required)
  successMessage:string | null = null;
  errorMessage:string | null = null;

  Form = {
    oldPassword: null,
    password: null
  }

  constructor(private cdr: ChangeDetectorRef,
              private profileRequest: ProfileRequestService) {
  }

  ngOnInit(): void {
    this.cdr.detectChanges()
    this.flights$ = this.profileRequest.findUserFlights();
  }

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


  changePassword() {
    this.Form.oldPassword = this.signInPassword.value;
    this.Form.password = this.password.value;
    this.profileRequest.changePassword(this.Form).subscribe(
      data => {
        this.errorMessage = null;
        this.successMessage = 'Password changed successfully'
      },
      error => {
        this.successMessage = null;
        this.errorMessage = "Invalid password"
      }
    );
  }

  details(borderPass: any) {
    this.borderPass = borderPass;
    this.showBorderPass = true;
  }

  exportAsPDF()
  {
    window.scrollTo(0,0)
    const data = document.getElementById('borderPass');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 195;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('borderPass.pdf');
      });
    }
  }

  close() {
    this.borderPass = null;
    this.showBorderPass = false;
  }
}
