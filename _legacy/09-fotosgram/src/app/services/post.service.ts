import { Injectable, EventEmitter } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostsResponse, Post } from '../interfaces/interfaces';
import { UserService } from './user.service';

const URL = environment.server;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  page = 0;

  newPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private fileTransfer: FileTransfer) { }

  getPosts(pull = false) {
    if(pull) {
      this.page = 0;
    }
    
    this.page++;
    return this.http.get<PostsResponse>(`${URL}/posts?page=${this.page}`);
  }

  createPost(post: Post) {
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise((resolve) => {
      this.http.post(`${ URL }/posts`, post, {headers}).subscribe(response => {
        this.newPost.emit(response['post']);
        resolve(true);
      });
    });
  }

  uploadImage(image: string) {

    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.userService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(image, `${URL}/posts/upload`, options)
    .then(rdo => console.log(rdo))
    .catch(error => console.log(error))
  }
}
