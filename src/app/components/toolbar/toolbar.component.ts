import { Component, OnInit } from '@angular/core';
import { SearchGitService } from '../../services/search-git.service';
import { Users } from '../../models/users';
import { Repositories } from 'src/app/models/repositories'; 
import { Router } from '@angular/router';
import { SearchResultComponent } from '../searchResult/searchResult.component';

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
  userTest:string;

  constructor( private router: Router, private searchGitService: SearchGitService ) { }
  
  findProfile(){
    this.router.navigate(['/search-result',this.username]);
    this.searchGitService.userRequest(this.username)
    this.user = this.searchGitService.user
    this.searchGitService.repoRequest(this.username)
    this.repos =this.searchGitService.repos
  }
  ngOnInit(){
  }

}
