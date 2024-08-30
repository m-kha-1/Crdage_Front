import { Component, OnInit } from '@angular/core';


import { ProductionsComponent } from './productions/productions.component';

// import { LoginComponent } from './login/login.component';

import { RouterOutlet } from '@angular/router';

import { routes } from './app.routes';

import { ProductionsService } from './productions.service';
import { ComponentCommunicatorService } from './component-communicator-service.service';

import { HttpClientModule } from '@angular/common/http';

import { NgFor } from '@angular/common';

import { RouterLink } from '@angular/router';

import { ProductionIdTtaskComponent } from './production-id-ttask/production-id-ttask.component';
import { AddformComponent } from './addform/addform.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,NgFor],
  providers: [ProductionsService,ComponentCommunicatorService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  

    title = 'testservice3';
  }





