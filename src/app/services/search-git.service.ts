import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Users } from '../models/users'; 
import { Repositories } from '../models/repositories';

@Injectable({
  providedIn: 'root'
})
export class SearchGitService {

  user:Users; 
  username:string;

  constructor( private http:HttpClient ) {
    this.user = new Users("","","","",0,0,0,new Date (),"");
    this.username = "lornakamau";
  }
  
  userRequest(){
    interface userApiResponse{
      name:string;
      login:string;
      bio:string;
      url: string;
      followers: number;
      following: number;
      public_repos : number; //check this out
      created_at : Date;
      avatar_url:string;
    }
    let promise = new Promise((resolve,reject)=>{
      this.http.get<userApiResponse>(`${environment.gitUrl}${this.username}?client_id=${environment.API_Key}`).toPromise().then(response=>{
        this.user.name =  response.name
        this.user.login = response.login
        this.user.bio =  response.bio
        this.user.url =  response.url
        this.user.followers =  response.followers
        this.user.following =  response.following
        this.user.public_repos =  response.public_repos
        this.user.created_at =  response.created_at
        this.user.avatar_url =  response.avatar_url
        resolve()
      },
      error=>{
        console.log("an error occured")
        reject(error)
      })
    })
    return promise
  }
}
      
