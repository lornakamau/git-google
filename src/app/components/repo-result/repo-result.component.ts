import { Component, OnInit } from '@angular/core';
import { SearchGitService } from '../../services/search-git.service';
import { RepositoriesByName } from '../../models/repositories-by-name';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-repo-result',
  templateUrl: './repo-result.component.html',
  styleUrls: ['./repo-result.component.css']
})
export class RepoResultComponent implements OnInit {

  reposByName:RepositoriesByName[];
  reponame:string;
  numberOfRepos: number;
  constructor( private route: ActivatedRoute, private searchGitService: SearchGitService ) {
    this.numberOfRepos =this.searchGitService.numberOfRepos
  }

  repoResult(){
    this.reponame = this.route.snapshot.paramMap.get('reponame')
    this.searchGitService.repoByNameRequest(this.reponame);
    this.reposByName =this.searchGitService.reposByName;
    this.numberOfRepos =this.searchGitService.numberOfRepos
  }

  ngOnInit(){
    this.repoResult()
  }

}
