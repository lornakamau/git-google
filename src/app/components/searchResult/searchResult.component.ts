import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../../models/users';
import { HttpClient } from '@angular/common/http';
import { SearchGitService } from '../../services/search-git.service';
import { Repositories } from 'src/app/models/repositories'; 

@Component({
  selector: 'app-search',
  templateUrl: './searchResult.component.html',
  styleUrls: ['./searchResult.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() repos:Repositories[];
  @Input() user:Users;
  username:string;

  constructor(private searchGitService: SearchGitService, private http:HttpClient) {}

  ngOnInit(){
    this.searchGitService.userRequest(this.username)
    this.user = this.searchGitService.user
    this.searchGitService.repoRequest(this.username)
    this.repos =this.searchGitService.repos
  }

}
