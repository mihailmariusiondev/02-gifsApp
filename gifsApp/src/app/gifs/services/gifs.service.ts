import { Injectable } from '@angular/core';

@Injectable({
  // esto es para que esté disponible de forma global en toda la app
  providedIn: 'root'
})
export class GifsService {

  private _historial : string[] = [];

  get getHistorial() {
    return [...this._historial]
  }

  buscarGifs (query: string){
    this._historial.push(query);
  }
}
