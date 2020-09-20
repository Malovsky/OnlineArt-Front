import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { AllArtistsComponent } from './components/all-artists/all-artists.component';
import { AllArtworksComponent } from './components/all-artworks/all-artworks.component';
import { ArtworksByCategoryComponent } from './components/artworks-by-category/artworks-by-category.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ViewArtistComponent } from './components/viewArtist/view-artist/view-artist.component';
import { ViewArtworkComponent } from './components/viewArtwork/view-artwork/view-artwork.component';
import { PanierComponent } from './components/panier/panier/panier.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    MyAccountComponent,
    AdministrationComponent,
    AllArtistsComponent,
    AllArtworksComponent,
    ArtworksByCategoryComponent,
    ViewArtistComponent,
    ViewArtworkComponent,
    PanierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }