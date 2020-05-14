import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';
import { HttpClient } from '@angular/common/http';
import { SearchGitService } from '../../services/search-git.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:Users;
  constructor( private searchGitService: SearchGitService, private http:HttpClient) { }
 
  ngOnInit() {
    this.searchGitService.userRequest()
    this.user = this.searchGitService.user
  }
}
