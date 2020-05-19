import { Component, OnInit } from '@angular/core';
import { SearchGitService } from '../../services/search-git.service';
import { Users } from '../../models/users';
import { Repositories } from 'src/app/models/repositories'; 
import { Router } from '@angular/router';
import { SearchResultComponent} from '../searchResult/searchResult.component';
import { RepositoriesByName } from '../../models/repositories-by-name';
import { NumberOfRepositories } from '../../models/number-of-repositories';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  username:string;
  user:Users;
  repos:Repositories[];
  searchResult: SearchResultComponent;
  reposByName:RepositoriesByName[];
  reponame:string;
  isShowUserForm = false;
  isShowRepoForm = false; 
  numberOfRepos: NumberOfRepositories;
  
  constructor( private router: Router, private searchGitService: SearchGitService ) {}

  toggleUserForm(){
    this.isShowUserForm = !this.isShowUserForm;
  }

  toggleRepoForm(){
    this.isShowRepoForm = !this.isShowRepoForm;
  }

  findProfile(){
    this.router.navigate(['/search-result',this.username]);
    this.searchGitService.userInfoRequest(this.username)
    this.user = this.searchGitService.user
    this.searchGitService.userRepoRequest(this.username)
    this.repos =this.searchGitService.repos
  }

  findRepos(){
    this.router.navigate(['/repo-result',this.reponame]);
    this.searchGitService.repoByNameRequest(this.reponame);
    this.reposByName =this.searchGitService.reposByName;
    this.searchGitService.repoByNameNumberRequest(this.reponame);
    this.numberOfRepos =this.searchGitService.numberOfRepos;
  } 

  ngOnInit(){
  }
}
