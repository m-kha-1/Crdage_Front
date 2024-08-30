import { Component, OnInit, TemplateRef } from '@angular/core';

//services
import { ProductionsService } from '../productions.service';


import { CommonModule } from '@angular/common';
import { ProductionIdTtaskComponent } from '../production-id-ttask/production-id-ttask.component';

import { HeaderComponent } from '../header/header.component';
// import { shared1 } from '../component-communicator-service.service';




import { FormsModule, NgForm } from '@angular/forms';

import { TabViewModule } from 'primeng/tabview';

import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
//datepicker ng bootstrap
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
//librairies me permettant de convertir mon objet date en string ,à mettre dans le constructor
import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

interface dateObj {
  year: number,
  month: number,
  day: number,

}






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

class CgArtist {
  id: number;
  name: string;
  selected: boolean;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.selected = false; // Par défaut, la case à cocher non cochée
  }
}

class Supervisor {
  id: number;
  name: string;
  selected: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.selected = false;
  }
}




@Component({
  selector: 'app-production-idtasks',
  standalone: true,
  imports: [HeaderComponent,CommonModule, ProductionIdTtaskComponent, TabViewModule, FormsModule, NgbAlertModule, NgbDatepickerModule],
  providers: [ProductionsService, NgbOffcanvas, NgbOffcanvasConfig, CommonModule],
  templateUrl: './production-idtasks.component.html',
  styleUrl: './production-idtasks.component.css'
})




export class ProductionIdtasksComponent {

  imagePath:string=""

  // datepicker
  model!: NgbDateStruct;

  sharedData!: { id: number, name: string, auteur: string };
  productionIdTasks: any

  infoProduction:{ id:string, name:string}={id:"", name:""}

  //producer available
  producerList: any
  selectedProducers: Producer[] = []

  //cgartist available
  cgArtistList: any
  selectedArtist: CgArtist[] = []

  //supervisor available
  supervisorList: any
  selectedSupervisor: Supervisor[] = []



  taskType: Array<string> = ["modelling", "surfacing", "rigging", "animation", "fx", "lighting", "compositing"]

  dateDue!: dateObj



  formData = {

    name: "",
    type: this.taskType[0],
    dateDue: "",
    producerID: 0,
    supervisor2ID: 0,
    cgArtist3Id: 0,
    PRODUCTIONId: 0,


  }


  savedData!: string;
  loadImage(): void {
  
    
    this.productionsService.image_production(this.infoProduction.name).subscribe(
      data => {
        this.imagePath = data; // Mettez à jour cette ligne selon la structure de vos données
        console.log('Image path loaded:', this.imagePath);
      },
      error => {
        console.error('Error loading image:', error);
      }
    );
  }






  constructor( private productionsService: ProductionsService, config: NgbOffcanvasConfig,
    private offcanvasService: NgbOffcanvas,
  ) {
    config.position = 'end';
    config.backdropClass = 'bg-info';
    config.keyboard = false;
  }
  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content);


  }




  ngOnInit(): void {
    //à l'initialisation récupère sahreddata (qui contient l'id de la production séléctionnée) de component productions à l'aide du service communicator
    
    
    
    
    
    
    
    let infoProduction= localStorage.getItem('dataProduction') 
    if (infoProduction != null ) {
    this.infoProduction=JSON.parse(infoProduction);console.log(this.infoProduction.name)}
    this.loadImage();


    
    
   
    


    // localStorage.setItem('name stored in localStorage : ', this.sharedData.name);
    // this.retrieveData();


    //utilisation à nouveau du service productions méthode loadTasksByProductionId 
    //crée un Observable pour gérer la réponse d'un  nouvel appel API  utilisant un endpoint  méthode get
    // tasks by production id : obtenir les taches associées à une production à partir de son id
    const votreValeur:{id:string,name:string}| null = JSON.parse(localStorage.getItem('dataProduction') || 'null') ;
    if (votreValeur){console.log('recuperation  valeur de cle : id de de la production',votreValeur.id )}
    // console.log('recuperation cle valeur',votreValeur)
    if (votreValeur && votreValeur.id !==null)
    {this.productionsService.loadTasksByProductionId(Number(votreValeur.id)).subscribe((data: any) => {
      this.productionIdTasks = data;
      console.log("taches lieés à la production", this.productionIdTasks); for (let item of this.productionIdTasks) {
        console.log("eleteee");
        console.log("elt", item.name);
      }
    });}

    this.loadProducer();
    this.loadCgArtist();
    this.loadSupervisor();

  }



  



  onSubmit(form: NgForm) {
    if (form.valid) {
      let idproducer = this.selectedProducers.map(producer => producer.id)
      this.formData.producerID = idproducer[0]

      // this.formData.producerID = this.selectedProducers.id
      this.formData.dateDue = this.formatDate(this.dateDue)

      let idsupervisor = this.selectedSupervisor.map(supervisor => supervisor.id);
      this.formData.supervisor2ID = idsupervisor[0]

      let idCgArtist = this.selectedArtist.map(cgartist => cgartist.id);
      this.formData.cgArtist3Id = idCgArtist[0]
      // this.formData.PRODUCTIONId = this.sharedData.id

      const dataProductionString = localStorage.getItem('dataProduction');
      if (dataProductionString) {
        // Convertir la chaîne JSON en objet JavaScript
        const dataProduction = JSON.parse(dataProductionString);
    
        // Récupérer la valeur de l'ID
        const id = dataProduction.id;
        this.formData.PRODUCTIONId = dataProduction.id;}

      
      //this.formData.PRODUCTIONId = this.sharedData.id

      // this.formData.producerID = [3]
      console.log('producer id recu', this.formData.producerID);
      console.log("le formdata:", this.formData)
      this.productionsService.createNewTask(this.formData).subscribe((response) => {
        console.log('task créée :', response);
        console.log("le formdata:", this.formData)
        // console.log("le datedue:",this.dateDue,'type:',typeof(this.dateDue))
        // Mettez à jour la variable productionCreated pour afficher le message de succès
        // this.productionCreated = true;
        // this.resetForm();

        //remove for test
        // this.productionsService.loadTasksByProductionId(this.sharedData.id).subscribe((data: any) => { this.productionIdTasks = data; console.log("taches lieés à la production", this.productionIdTasks) });
        //remove for test
        
        this.resetform();
        location.reload();
      });
    } else {
      console.log('Form submission failed. Form is invalid.');
    }


  }


  formatDate(d: dateObj): string {
    const year = d['year'];
    const month = d['month'];
    const day = d['day'];
    console.log("resultat date changement", `${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;

  }


  resetform() {
    this.formData = {
      name: "",
      type: this.taskType[0],
      dateDue: "",
      producerID: 0,
      supervisor2ID: 0,
      cgArtist3Id: 0,
      PRODUCTIONId: 0,



    }
  }



  loadProducer() {

    this.productionsService.loadProducer().subscribe(
      (data: any) => {
        this.producerList = data; // Assurez-vous que 'data' est un tableau d'objets
        console.log("la liste de producteurs est : ", this.producerList);
      },
      (error: any) => {
        console.error("Une erreur s'est produite lors du chargement des producteurs :", error);
      }
    );
  }

  loadCgArtist() {

    this.productionsService.loadCgArtist().subscribe(
      (data: any) => {
        this.cgArtistList = data; 
        console.log("la liste de cgartists est : ", this.cgArtistList); console
      },
      (error: any) => {
        console.error("Une erreur s'est produite lors du chargement des cgartists :", error);
      }
    );
  }

  loadSupervisor() {

    this.productionsService.loadSupervisor().subscribe(
      (data: any) => {
        this.supervisorList = data; 
        console.log("la liste de supervisor est : ", this.supervisorList); console
      },
      (error: any) => {
        console.error("Une erreur s'est produite lors du chargement des supervisors :", error);
      }
    );
  }

  handleInput(datadelev: { id: number, name: string }) {
    localStorage.setItem("taskData",JSON.stringify(datadelev))


    console.log("message du composant:task exportée", datadelev);
  }





  delete(datadelev: { id: number }) {
    if (localStorage.getItem("userType") == "(supervisor)") {
      this.productionsService.deleteTask(datadelev.id).subscribe(
        response => {
          // Log de la réponse pour s'assurer que l'appel a réussi
          console.log('Réponse de suppression:', response);
          // Recharger la page après la suppression réussie
          location.reload();
        },
        error => {
          // Gérer les erreurs potentielles
          console.error('Erreur lors de la suppression', error);
        }
      );
    }
  else{alert("You must be a supervisor to delete a task")}
  
  }





}
