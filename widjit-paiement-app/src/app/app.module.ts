import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AmanpayComponent } from "./components/amanpay/amanpay.component";
import { CardComponent } from "./components/card/card.component";
import { CardinfoComponent } from "./components/card/cardinfo/cardinfo.component";
import { CardstepsComponent } from "./components/card/cardsteps/cardsteps.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { PaimentWedgitComponent } from "./components/paiment-wedgit/paiment-wedgit.component";
import { SteperComponent } from "./components/steper/steper.component";
import { GuideComponent } from "./components/token/guide/guide.component";
import { StepsComponent } from "./components/token/steps/steps.component";
import { TokenComponent } from "./components/token/token.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";


@NgModule({
  declarations: [
    AppComponent,
    PaimentWedgitComponent,
    AmanpayComponent,
    CardComponent,
    TokenComponent,
    HeaderComponent,
    SteperComponent,
    HomeComponent,
    CardstepsComponent,
    CardinfoComponent,
    StepsComponent,
    GuideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    BrowserAnimationsModule // Add BrowserAnimationsModule here if you want to use animations
  ],
  providers: [
   // provideAnimationsAsync('noop'),
   // provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
