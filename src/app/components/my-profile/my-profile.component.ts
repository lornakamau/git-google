import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../../models/users';
import { HttpClient } from '@angular/common/http';
import { SearchGitService } from '../../services/search-git.service';
import { Repositories } from 'src/app/models/repositories'; 

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  repos:Repositories[];
  user:Users;

  constructor(private searchGitService: SearchGitService, private http:HttpClient) {}

  ngOnInit(){
    this.searchGitService.userInfoRequest("lornakamau")
    this.user = this.searchGitService.user
    this.searchGitService.userRepoRequest("lornakamau")
    this.repos =this.searchGitService.repos
  }
}
 