import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit{

constructor(private sidebarService: SidebarService){

  }
  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }
}
