import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SearchFlightsDataService} from "../../core/transfer/search-flights-data.service";
import {ReserveFlightRequestService} from "../../core/http/reserve-flight-request.service";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SearchFormRequestService} from "../../core/http/search-form-request.service";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reserve-flight',
  templateUrl: './reserve-flight.component.html',
  styleUrls: ['./reserve-flight.component.css']
})
export class ReserveFlightComponent implements OnInit {

  flight: any;
  borderPass: any;
  showBorderPass:boolean = false;
  seatCodes$: Observable<any> | null = null;
  planets$: Observable<any> | null = null;
  documentTypes: { type: string, description: string }[] = [
    {"type": 'PASSPORT', "description": 'Passport'},
    {"type": 'ID_CARD', "description": 'ID Card'}
  ]
  gender: { type: string, description: string }[] = [
    {"type": 'MALE', "description": 'Male'},
    {"type": 'FEMALE', "description": 'Female'},
    {"type": 'OTHER', "description": 'Other'}
  ]

  personalInformationFormGroup: FormGroup;
  seatCodeFormGroup: FormGroup;

  form = {
    tourist: {
      touristId: null,
      birthDate: null,
      documentId: null,
      documentType: null,
      firstName: null,
      lastName: null,
      gender: null,
      citizenship: null,
    },
    seatCode: null,
    flightId: null,
    flightType: null
  }

  constructor(private cdr: ChangeDetectorRef,
              private data: SearchFlightsDataService,
              private reserveFlightRequest: ReserveFlightRequestService,
              private _formBuilder: FormBuilder,
              private searchFormRequest: SearchFormRequestService) {
    this.personalInformationFormGroup = this._formBuilder.group({
      touristId: ['', Validators.required],
      birthDate: ['', Validators.required],
      documentId: ['', Validators.required],
      documentType: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      citizenship: ['', Validators.required]
    });
    this.seatCodeFormGroup = this._formBuilder.group({
      seatCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.flight = this.data.Flight;
    this.seatCodes$ = this.reserveFlightRequest.findAvailableSeatCodes(this.flight.flightId, this.flight.flightType);
    this.planets$ = this.searchFormRequest.getPlanetsRequest();
    this.cdr.detectChanges();
  }


  public reserve() {
    this.form.tourist.birthDate = this.personalInformationFormGroup.controls['birthDate'].value;
    this.form.tourist.documentId = this.personalInformationFormGroup.controls['documentId'].value;
    this.form.tourist.documentType = this.personalInformationFormGroup.controls['documentType'].value;
    this.form.tourist.firstName = this.personalInformationFormGroup.controls['firstName'].value;
    this.form.tourist.lastName = this.personalInformationFormGroup.controls['lastName'].value;
    this.form.tourist.gender = this.personalInformationFormGroup.controls['gender'].value;
    this.form.tourist.citizenship = this.personalInformationFormGroup.controls['citizenship'].value;
    this.form.seatCode = this.seatCodeFormGroup.controls['seatCode'].value;
    this.form.flightId = this.flight.flightId;
    this.form.flightType = this.flight.flightType;
    this.reserveFlightRequest.reserve(this.form).subscribe(response => {
      this.borderPass = response;
      this.showBorderPass = true;
    })
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
    this.showBorderPass = false;
  }

  open() {
    this.showBorderPass = true;
  }
}
