import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../../models/users';
import { SearchGitService } from '../../services/search-git.service';
import { Repositories } from 'src/app/models/repositories'; 
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoriesByName } from '../../models/repositories-by-name';

@Component({
  selector: 'app-search',
  templateUrl: './searchResult.component.html',
  styleUrls: ['./searchResult.component.css']
})
export class SearchResultComponent implements OnInit {

  repos:Repositories[];
  user:Users;
  username:string;  

  constructor( private route: ActivatedRoute, private searchGitService: SearchGitService ) {}

  searchResult(){
    this.username = this.route.snapshot.paramMap.get('username')
    this.searchGitService.userInfoRequest(this.username)
    this.user = this.searchGitService.user
    this.searchGitService.userRepoRequest(this.username)
    this.repos =this.searchGitService.repos
  }

  ngOnInit(){
    this.searchResult()
  }
}