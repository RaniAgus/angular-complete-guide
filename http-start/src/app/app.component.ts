import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching: boolean = false;
  error = null;
  errorSub: Subscription;

  constructor(private postsService: PostsService) {} // Se inyecta la dependencia

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => this.error = errorMessage);
    this.onFetchPosts();
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe
      ( posts => { this.loadedPosts = posts; this.isFetching = false; }
      , error => { this.error = error.message; this.isFetching = false; }
      )
    ;
  }

  onClearPosts() {
    // Send Http request
    this.postsService.clearPosts().subscribe(() => this.onFetchPosts());
  }
  
}
