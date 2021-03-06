import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  // esto es para que esté disponible de forma global en toda la app
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'ERRUFlHbghUkFTtTl1ipwfPh0Uir8625';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
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

    if (!this._historial.includes(query)) {
      this._historial.push(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', query)

    this.http.get<SearchGifResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe((resp) => {
        this.resultados = resp.data
        localStorage.setItem('gifs', JSON.stringify(resp.data))
      })


  }
}
