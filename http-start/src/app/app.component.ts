import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching: boolean = false;
  error = null;

  constructor(private postsService: PostsService) {} // Se inyecta la dependencia

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData).subscribe(() => this.onFetchPosts()); // Si no me suscribo a la respuesta, Angular no va a enviar la consulta
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
