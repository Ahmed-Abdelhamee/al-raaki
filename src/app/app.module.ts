import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ZfooterComponent } from './components/zfooter/zfooter.component';
import { SoundsComponent } from './components/sounds/sounds.component';
import { ProductsComponent } from './components/products/products.component';
import { VisitsComponent } from './components/visits/visits.component';
import { CallUsComponent } from './components/call-us/call-us.component';
import { FatawyComponent } from './components/fatawy/fatawy.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStorage, getStorage } from '@angular/fire/storage'; // write this special code for upload img 
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { SafeUrlCutomerViewPipe } from './Modal/pipes/safe-url-cutomer-view.pipe';
import { EditProductLinkPipe } from './Modal/pipes/edit-product-link.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { VisualsComponent } from './components/visuals/visuals.component'; // write this special code for upload img 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ZfooterComponent,
    SoundsComponent,
    ProductsComponent,
    VisitsComponent,
    CallUsComponent,
    FatawyComponent,
    AboutUsComponent,
    SafeUrlCutomerViewPipe,
    EditProductLinkPipe,
    PaymentComponent,
    VisualsComponent,
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass: "toast-top-left"
    }), // ToastrModule added
    HttpClientModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())
  ],
  providers: [
    // write this special code for upload img 
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
