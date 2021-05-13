import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postUrl = 'https://ng-complete-guide-1baa5-default-rtdb.firebaseio.com/posts.json';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(postData: Post) {
    this.http
      .post<{ name: string }>
        ( this.postUrl
        , postData
        , { headers: new HttpHeaders({'key': 'value'}) // Headers
          , params: new HttpParams().set('print', 'pretty') // Query parameters
          , observe: 'body' // 'body' es un atributo de la 'response' (se puede recibir esta última)
          }
        ) // URL de la request + body + headers
      .subscribe(() => {}, error => this.error.next(error.message)); // Si no me suscribo a la respuesta, Angular no va a enviar la consulta
  } 

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(this.postUrl)
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
          ) // Se puede usar catchError para enviarlo a analytics o cosas similares no relacionadas a la View. 
            // Debe retornar throwError para que la cadena continúe
        )
      ;
  }

  clearPosts() {
    return this.http
      .delete(this.postUrl, { observe: 'events', responseType: 'json' })
      .pipe(
        tap 
        ( event => {
            switch(event.type) {
              case HttpEventType.Sent:
                console.log('Data sent, waiting for response'); break;
              case HttpEventType.Response:
                console.log(event.body); break;
              default:
                console.log(event);
            }
          }
        )
    );
  }

}
