import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  disabled = false;
  
  constructor(private postService: PostService) {}
  
  ngOnInit(): void {
    this.next();

    this.postService.newPost.subscribe((post: Post) => this.posts.unshift(post));
  }

  doRefresh(event) {

    this.disabled = false;
    this.posts = [];
    this.next(event, true)
  }
  
  next(event?, pull = false) {
    this.postService.getPosts(pull).subscribe(response => {
      console.log(response);
      // this.posts.push(...response.posts);
      this.posts.push(...response['posts']);

      if(event) {
        event.target.complete();
        // if(response.posts.length === 0) {
        if(response['posts'].length === 0) {
          this.disabled = true;
        }
      }
    });
    
  }
}
