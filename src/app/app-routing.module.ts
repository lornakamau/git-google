import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchResultComponent} from './components/searchResult/searchResult.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component'; 
import { RepoResultComponent } from './components/repo-result/repo-result.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'my-profile', component: MyProfileComponent},
  { path: 'search-result/:username', component: SearchResultComponent},
  { path: 'repo-result/:reponame', component: RepoResultComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
