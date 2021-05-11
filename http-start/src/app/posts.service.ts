import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  createAndStorePost(postData: Post) {
    this.http
      .post<{ name: string }>('https://ng-complete-guide-1baa5-default-rtdb.firebaseio.com/posts.json', postData) // URL de la request + body
      .subscribe(responseData => console.log(responseData)); // Si no me suscribo a la respuesta, Angular no va a enviar la consulta
      ;
  } 

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>('https://ng-complete-guide-1baa5-default-rtdb.firebaseio.com/posts.json')
      .pipe  // Es buena practica usar los operadores de rxjs
        ( map
          ( responseData => {
              const postsArray: Post[] = [];
              for(const key in responseData) {
                // Se filtran solo los objetos que tengan una key
                if(responseData.hasOwnProperty(key)) {
                  // Se pushea un nuevo objeto con todos los key-values de responseData + el ID unico generado por firebase
                  postsArray.push( { ...responseData[key], id:key } ); 
                }
              }
              return postsArray;
            }
          ) 
        )
      ;
  }


}
