import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {SearchFormComponent} from './feature/searh-form/search-form.component';
import {MatSliderModule} from "@angular/material/slider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter'
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ToolbarComponent} from './feature/toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {SightComponent} from './feature/sight/sight.component';
import {FooterComponent} from './feature/footer/footer.component';
import {SearchResultComponent} from './feature/search-result/search-result.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './feature/home/home.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {SignComponent} from './feature/sign/sign.component';
import {SignFormComponent} from './feature/sign-form/sign-form.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {ProfileComponent} from './feature/profile/profile.component';
import {AuthGuard} from "./util/auth-guard";
import {ManageFlightsComponent} from './feature/manage-flights/manage-flights.component';
import {MatStepperModule} from "@angular/material/stepper";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import {ReserveFlightComponent} from './feature/reserve-flight/reserve-flight.component';
import {QrCodeModule} from "ng-qrcode";

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'prefix'},
  {path: 'search-result', component: SearchResultComponent, pathMatch: 'prefix'},
  {path: 'reserve-flight/:id', component: ReserveFlightComponent, pathMatch: 'prefix'},
  {path: 'sign', component: SignComponent, pathMatch: 'prefix'},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {expectedRole: ['ADMIN', 'USER']}
  },
  {
    path: 'manage-flights',
    component: ManageFlightsComponent,
    canActivate: [AuthGuard],
    data: {expectedRole: ['ADMIN']}
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ToolbarComponent,
    SightComponent,
    FooterComponent,
    SearchResultComponent,
    HomeComponent,
    SignComponent,
    SignFormComponent,
    ProfileComponent,
    ManageFlightsComponent,
    ReserveFlightComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatSliderModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        RouterModule.forRoot(routes),
        MatExpansionModule,
        MatCardModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatMenuModule,
        MatStepperModule,
        NgxMatTimepickerModule,
        QrCodeModule
    ],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {


}
