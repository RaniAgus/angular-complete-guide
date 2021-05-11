import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {} // Se inyecta la dependencia

  ngOnInit() {}

  onCreatePost(postData: { title: string, content: string }) {
    // Send Http request
    this.http
      .post('https://ng-complete-guide-1baa5-default-rtdb.firebaseio.com/posts.json', postData) // URL de la request + body
      .subscribe(responseData => console.log(responseData)); // Si no me suscribo a la respuesta, Angular no va a enviar la consulta
      ;
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
