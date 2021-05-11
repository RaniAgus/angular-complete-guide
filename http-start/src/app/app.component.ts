import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {} // Se inyecta la dependencia

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string, content: string }) {
    // Send Http request
    this.http
      .post('https://ng-complete-guide-1baa5-default-rtdb.firebaseio.com/posts.json', postData) // URL de la request + body
      .subscribe(responseData => console.log(responseData)); // Si no me suscribo a la respuesta, Angular no va a enviar la consulta
      ;
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  fetchPosts() {
    this.http
      .get('https://ng-complete-guide-1baa5-default-rtdb.firebaseio.com/posts.json')
      .pipe( map((responseData: HttpResponse<any>) => this.getPostsArray(responseData)) ) // Es buena practica usar los operadores de rxjs
      .subscribe(posts => console.log(posts))
      ;
  }

  private getPostsArray(responseData: HttpResponse<any>) {
    const postsArray = [];
    for(const key in responseData) {
      // Se filtran solo los objetos que tengan una key
      if(responseData.hasOwnProperty(key)) {
        // Se pushea un nuevo objeto con todos los key-values de responseData + el ID unico generado por firebase
        postsArray.push( { ...responseData[key], id:key } ); 
      }
    }
    return postsArray;
  }
  
}
