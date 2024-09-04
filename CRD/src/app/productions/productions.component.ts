import { Component,OnInit,TemplateRef } from '@angular/core';

import { ProductionComponent } from '../production/production.component';
import { ProductionIdTtaskComponent } from '../production-id-ttask/production-id-ttask.component';

import { ProductionsService } from '../productions.service';
import { CommonModule } from '@angular/common';

import { NgFor } from '@angular/common';

import { RouterOutlet } from '@angular/router';
import { ComponentCommunicatorService } from '../component-communicator-service.service';
import { RouterLink } from '@angular/router';

import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import {NgbCollapseModule,NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../header/header.component';



class Producer {
  id: number;
  name: string;
  selected: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.selected = false; // Par défaut, la case à cocher non cochée
  }
}

@Component({
  selector: 'app-productions',
  standalone: true,
  imports: [HeaderComponent,ProductionComponent,ProductionIdTtaskComponent,CommonModule,RouterOutlet,RouterLink,NgbCollapseModule,NgbDropdownModule,FormsModule],
  templateUrl: './productions.component.html',
  styleUrl: './productions.component.css'
})
export class ProductionsComponent implements OnInit {

 
  // productions:any=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u'];
  producerList: any 
  productionCreated:any
  productions: any;
  tasks: any[] = [];
  selectedProducers:Producer[]=[]
  formData={
  
    name:"",
    client:"",
    producers:[] as number[]
    
   
  }

  constructor(
    
    
    private productionService: ProductionsService,private componentCommunicatorService: ComponentCommunicatorService,
    config: NgbOffcanvasConfig,
		private offcanvasService: NgbOffcanvas,) { 
      const paramValue = 'valeurDynamique'; // Remplacez par la valeur que vous souhaitez passer
      // this.componentCommunicatorService = new ComponentCommunicatorService("paramValue");
      // window.localStorage.clear()

      config.position = 'end';
		  config.backdropClass = 'bg-info';
		  config.keyboard = false;}

 
  


   
  // ngOnInit() :void{window.localStorage.clear(); this.loadProductions();this.loadProducer();}
  ngOnInit() :void{ this.loadProductions();this.loadProducer();}


    loadProducer(){

      this.productionService.loadProducer().subscribe(
        (data: any) => {
          this.producerList = data; // Assurez-vous que 'data' est un tableau d'objets
          console.log("la liste de producteurs est : ", this.producerList);
        },
        (error: any) => {
          console.error("Une erreur s'est produite lors du chargement des producteurs :", error);
        }
      );}

      
    
    loadProductions(){this.productionService.getProductions().subscribe((data: any) => {
      this.productions = data;
      console.log(this.productions)})}
     
    
  
    // onEventClick(event:any):void{this.componentCommunicatorService.setData(event); }
    
    handleInput(evt: {id:number,name:string}) {
      console.log('handleInput appelé avec:', evt);

      try {
        const testKey = 'test';
        localStorage.setItem(testKey, 'testValue');
        localStorage.removeItem(testKey);
        console.log('localStorage is working properly.');
      } catch (e) {
        console.error('localStorage is not available:', e);
      }
      console.log('Input value:', evt);
      
      this.componentCommunicatorService.setSharedValue(evt)
      // const p:{"name" : string,"id" : string}|null=localStorage.setItem('cle22',{evt.id,evt.name} )|null
      const dataProduction={"id":evt.id,"name":evt.name}
      localStorage.setItem("dataProduction",JSON.stringify(dataProduction))
      console.log({"id":evt.id,"name":evt.name})

      console.log("production exporte :", evt)
    }
    
    open(content: TemplateRef<any>) {
      this.offcanvasService.open(content);
 
    // console.log(this.tasks)
}
resetForm():void{
  this.formData={
    name:'',
    client:'',
    producers:[]
  };
}



onSubmit(form: NgForm){if (localStorage.getItem('userType')=='(producer)'){

  if (form.valid) {
    // let path : string=window.localStorage.getItem('path') || '';
  
    this.formData.producers = this.selectedProducers.map(producer => producer.id);
    this.productionService.createNewProduction(this.formData).subscribe((response) => {
      console.log('Production créée :', response);
      this.productionCreated = true;
      console.log("formData :", JSON.stringify(this.formData));
      this.resetForm();
      location.reload();
    
    });
  } else {
    console.log('Form submission failed. Form is invalid.');
  }
  this.productionCreated = false;
}
else {alert('You must be a producer to create a new production')}
 

  
  

}

}




/////////////////////////////////////////////////////////
  
  // onEventClick(event:any):void{this.productionService.loadTasksByProductionId(event['id']).subscribe((d: any) => {
  //   this.tasks = d.tasks; });console.log(this.tasks[0]);this.componentCommunicatorService.setData(this.tasks); }



  // onEventClick(event:any){console.log(event['id'])}

  ///////////////////////////////////////////////////////////////////////////////

  // export class ProductionsComponent implements OnInit {

 
  //   // productions:any=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u'];
  //   producerList: any 
  //   productionCreated:any
  //   productions: any;
  //   tasks: any[] = [];
  //   selectedProducers:Producer[]=[]
  //   formData={
    
  //     name:"",
  //     client:"",
  //     producers:[] as number[]
      
     
  //   }
  
  //   constructor(
      
      
  //     private productionService: ProductionsService,private componentCommunicatorService: ComponentCommunicatorService,
  //     config: NgbOffcanvasConfig,
  //     private offcanvasService: NgbOffcanvas,) { 
  //       const paramValue = 'valeurDynamique'; // Remplacez par la valeur que vous souhaitez passer
  //       // this.componentCommunicatorService = new ComponentCommunicatorService("paramValue");
  //       // window.localStorage.clear()
  
  //       config.position = 'end';
  //       config.backdropClass = 'bg-info';
  //       config.keyboard = false;}
  
   
    
  
  
     
  //   // ngOnInit() :void{window.localStorage.clear(); this.loadProductions();this.loadProducer();}
  //   ngOnInit() :void{ this.loadProductions();this.loadProducer();}
  
  
  //     loadProducer(){
  
  //       this.productionService.loadProducer().subscribe(
  //         (data: any) => {
  //           this.producerList = data; // Assurez-vous que 'data' est un tableau d'objets
  //           console.log("la liste de producteurs est : ", this.producerList);
  //         },
  //         (error: any) => {
  //           console.error("Une erreur s'est produite lors du chargement des producteurs :", error);
  //         }
  //       );}
  
        
      
  //     loadProductions(){this.productionService.getProductions().subscribe((data: any) => {
  //       this.productions = data;
  //       console.log(this.productions)})}
       
      
    
  //     // onEventClick(event:any):void{this.componentCommunicatorService.setData(event); }
      
  //     handleInput(evt: {id:number,name:string}) {
  //       console.log('handleInput appelé avec:', evt);
  
  //       try {
  //         const testKey = 'test';
  //         localStorage.setItem(testKey, 'testValue');
  //         localStorage.removeItem(testKey);
  //         console.log('localStorage is working properly.');
  //       } catch (e) {
  //         console.error('localStorage is not available:', e);
  //       }
  //       console.log('Input value:', evt);
        
  //       this.componentCommunicatorService.setSharedValue(evt)
  //       // const p:{"name" : string,"id" : string}|null=localStorage.setItem('cle22',{evt.id,evt.name} )|null
  //       const dataProduction={"id":evt.id,"name":evt.name}
  //       localStorage.setItem("dataProduction",JSON.stringify(dataProduction))
  //       console.log({"id":evt.id,"name":evt.name})
  
  //       console.log("production exporte :", evt)
  //     }
      
  //     open(content: TemplateRef<any>) {
  //       this.offcanvasService.open(content);
   
  //     // console.log(this.tasks)
  // }
  // resetForm():void{
  //   this.formData={
  //     name:'',
  //     client:'',
  //     producers:[]
  //   };
  // }
  
  
  
  // onSubmit(form: NgForm){
   
  
  //   if (form.valid) {
  //     this.formData.producers = this.selectedProducers.map(producer => producer.id);
  //     this.productionService.createNewProduction(this.formData).subscribe((response) => {
  //       console.log('Production créée :', response);
  //       // Mettez à jour la variable productionCreated pour afficher le message de succès
  //       this.productionCreated = true;
  //       this.resetForm();
      
  //     });
  //   } else {
  //     console.log('Form submission failed. Form is invalid.');
  //   }
  //   this.productionCreated = false;
    
  
  // }
  
  // }
  
  
  