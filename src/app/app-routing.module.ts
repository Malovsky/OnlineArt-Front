import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AllArtistsComponent } from './components/all-artists/all-artists.component';
import { AllArtworksComponent } from './components/all-artworks/all-artworks.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { ViewArtistComponent } from './components/viewArtist/view-artist/view-artist.component';
import { ViewArtworkComponent } from './components/viewArtwork/view-artwork/view-artwork.component';
import { PanierComponent } from './components/panier/panier/panier.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'myAccount',
    component: MyAccountComponent
  },
  {
    path: 'allArtists',
    component: AllArtistsComponent
  },
  {
    path: 'allArtworks',
    component: AllArtworksComponent
  },
  {
    path: 'artwokrsByCategory/:category',
    component: AllArtworksComponent
  },
  {
    path: 'administration',
    component: AdministrationComponent
  },
  {
    path: 'viewArtist/:id',
    component: ViewArtistComponent
  },
  {
    path: 'viewArtwork/:id',
    component: ViewArtworkComponent
  },
  {
    path: 'panier',
    component: PanierComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
