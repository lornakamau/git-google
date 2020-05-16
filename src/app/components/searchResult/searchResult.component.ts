import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../../models/users';
import { HttpClient } from '@angular/common/http';
import { SearchGitService } from '../../services/search-git.service';
import { Repositories } from 'src/app/models/repositories'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';

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
    this.searchGitService.userRequest(this.username)
    this.user = this.searchGitService.user
    this.searchGitService.repoRequest(this.username)
    this.repos =this.searchGitService.repos
  }

  ngOnInit(){
    this.searchResult()
  }
}
