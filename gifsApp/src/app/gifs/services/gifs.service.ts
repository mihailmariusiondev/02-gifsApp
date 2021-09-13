import { Injectable } from '@angular/core';

@Injectable({
  // esto es para que esté disponible de forma global en toda la app
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'ERRUFlHbghUkFTtTl1ipwfPh0Uir8625';

  private _historial : string[] = [];

  get getHistorial() {
    return [...this._historial]
  }

  buscarGifs (query: string){
    
    query = query.trim().toLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.push(query);
      this._historial = this._historial.splice(0, 10);
    }

  }
}
