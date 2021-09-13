import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  // esto es para que esté disponible de forma global en toda la app
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'ERRUFlHbghUkFTtTl1ipwfPh0Uir8625';
  private _historial: string[] = [];

  public resultados: Gif[] = []

  get getHistorial() {
    return [...this._historial]
  }

  constructor(private http: HttpClient) {

    // Forma 2 para guardarse en el LocalStorage
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('gifs')!) || [];

    // Forma 1 para guardarse en el LocalStorage
    // if(localStorage.getItem('historial')){
    //   // el operador ! para que confíe en que no será null
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)
    // }
  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();
    debugger;

    if (!this._historial.includes(query)) {
      this._historial.push(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));      
    }

    this.http.get<SearchGifResponse>(`https://api.giphy.com/v1/gifs/search?api_key=ERRUFlHbghUkFTtTl1ipwfPh0Uir8625&q=${query}&limit=10`)
      .subscribe((resp) => {
        debugger;
        this.resultados = resp.data
        localStorage.setItem('gifs', JSON.stringify(resp.data))
      })


  }
}
