import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  constructor() { 

    this.cargarMenu();

  }
  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')!)||[];
  }
  
}
