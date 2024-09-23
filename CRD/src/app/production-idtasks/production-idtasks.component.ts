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
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
//librairies me permettant de convertir mon objet date en string ,à mettre dans le constructor
import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

interface dateObj {
  year: number;
  month: number;
  day: number;
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
  imports: [
    HeaderComponent,
    CommonModule,
    ProductionIdTtaskComponent,
    TabViewModule,
    FormsModule,
    NgbAlertModule,
    NgbDatepickerModule,
  ],
  providers: [
    ProductionsService,
    NgbOffcanvas,
    NgbOffcanvasConfig,
    CommonModule,
  ],
  templateUrl: './production-idtasks.component.html',
  styleUrl: './production-idtasks.component.css',
})
export class ProductionIdtasksComponent {
  trigger_name: boolean[] = [];
  trigger_type: boolean[] = [];
  trigger_supervisor: boolean[] = [];
  trigger_artist: boolean[] = [];
  trigger_date: boolean[] = [];
  trigger_status: boolean[] = [];
  imagePath = { vignette: '' };
  newName: string = '';

  // datepicker
  model!: NgbDateStruct;

  sharedData!: { id: number; name: string; auteur: string };
  productionIdTasks: any;

  infoProduction: { id: string; name: string } = { id: '', name: '' };

  //producer available
  producerList: any;
  selectedProducers: Producer[] = [];

  //cgartist available
  cgArtistList: any;
  selectedArtist: CgArtist[] = [];
  artistList: any;

  //supervisor available
  supervisorList: any;

  selectedSupervisor: Supervisor[] = [];

  taskType: Array<string> = [
    'modelling',
    'surfacing',
    'rigging',
    'animation',
    'fx',
    'lighting',
    'compositing',
  ];

  dateDue!: dateObj;

  formData = {
    name: '',
    type: this.taskType[0],
    dateDue: '',
    producerID: 0,
    supervisor2ID: 0,
    cgArtist3Id: 0,
    PRODUCTIONId: 0,
  };

  savedData!: string;
  // loadImage(): void {

  //   this.productionsService.image_production(Number(this.infoProduction.name)).subscribe(
  //     data => {
  //       this.imagePath = data; // Mettez à jour cette ligne selon la structure de vos données
  //       console.log('Image path loaded:', this.imagePath);
  //     },
  //     error => {
  //       console.error('Error loading image:', error);
  //     }
  //   );
  // }

  loadImage(): void {
    let npStr = window.localStorage.getItem('dataProduction');

    if (npStr != null) {
      let np = JSON.parse(npStr);
      let npid = np.id;

      this.productionsService.image_production(npid).subscribe(
        (data) => {
          this.imagePath = data;
          console.log('Image path loaded dans details tasks:', this.imagePath);
        },
        (error) => {
          console.error('Error loading image:', error);
        }
      );
    }
  }

  constructor(
    private productionsService: ProductionsService,
    config: NgbOffcanvasConfig,
    private offcanvasService: NgbOffcanvas
  ) {
    config.position = 'end';
    config.backdropClass = 'bg-info';
    config.keyboard = false;
  }
  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content);
  }

  ngOnInit(): void {
    let infoProduction = localStorage.getItem('dataProduction');
    if (infoProduction != null) {
      this.infoProduction = JSON.parse(infoProduction);
      console.log(this.infoProduction.name);
    }
    this.loadImage();

    const votreValeur: { id: string; name: string } | null = JSON.parse(
      localStorage.getItem('dataProduction') || 'null'
    );
    if (votreValeur) {
      console.log(
        'recuperation  valeur de cle : id de de la production',
        votreValeur.id
      );
    }
    if (votreValeur && votreValeur.id !== null) {
      this.productionsService
        .loadTasksByProductionId(Number(votreValeur.id))
        .subscribe((data: any) => {
          this.productionIdTasks = data;
          console.log('taches lieés à la production', this.productionIdTasks);
          for (let i = 1; i <= this.productionIdTasks.length; i++) {
            this.trigger_name.push(true);
            this.trigger_supervisor.push(true);
            this.trigger_artist.push(true);
            this.trigger_date.push(true);
            this.trigger_status.push(true);
          }
          console.log(`trigger est rempli : ${this.trigger_name}`);
        });
    }

    this.loadProducer();
    this.loadCgArtist();
    this.loadSupervisor();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let idproducer = this.selectedProducers.map((producer) => producer.id);
      this.formData.producerID = idproducer[0];

      this.formData.dateDue = this.formatDate(this.dateDue);

      let idsupervisor = this.selectedSupervisor.map(
        (supervisor) => supervisor.id
      );
      this.formData.supervisor2ID = idsupervisor[0];

      let idCgArtist = this.selectedArtist.map((cgartist) => cgartist.id);
      this.formData.cgArtist3Id = idCgArtist[0];

      const dataProductionString = localStorage.getItem('dataProduction');
      if (dataProductionString) {
        const dataProduction = JSON.parse(dataProductionString);

        const id = dataProduction.id;
        this.formData.PRODUCTIONId = dataProduction.id;
      }

      console.log('producer id recu', this.formData.producerID);
      console.log('le formdata:', this.formData);
      this.productionsService
        .createNewTask(this.formData)
        .subscribe((response) => {
          console.log('task créée :', response);
          console.log('le formdata:', this.formData);

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
    console.log('resultat date changement', `${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }

  resetform() {
    this.formData = {
      name: '',
      type: this.taskType[0],
      dateDue: '',
      producerID: 0,
      supervisor2ID: 0,
      cgArtist3Id: 0,
      PRODUCTIONId: 0,
    };
  }

  loadProducer() {
    this.productionsService.loadProducer().subscribe(
      (data: any) => {
        this.producerList = data;
        console.log('la liste de producteurs est : ', this.producerList);
      },
      (error: any) => {
        console.error(
          "Une erreur s'est produite lors du chargement des producteurs :",
          error
        );
      }
    );
  }

  loadCgArtist() {
    this.productionsService.loadCgArtist().subscribe(
      (data: any) => {
        this.cgArtistList = data;
        console.log('la liste de cgartists est : ', this.cgArtistList);
        console;
      },
      (error: any) => {
        console.error(
          "Une erreur s'est produite lors du chargement des cgartists :",
          error
        );
      }
    );
  }

  loadSupervisor() {
    this.productionsService.loadSupervisor().subscribe(
      (data: any) => {
        this.supervisorList = data;
        console.log('la liste de supervisor est : ', this.supervisorList);
        console;
      },
      (error: any) => {
        console.error(
          "Une erreur s'est produite lors du chargement des supervisors :",
          error
        );
      }
    );
  }

  handleInput(datadelev: { id: number; name: string }) {
    localStorage.setItem('taskData', JSON.stringify(datadelev));

    console.log('message du composant:task exportée', datadelev);
  }

  delete(datadelev: { id: number }) {
    if (localStorage.getItem('userType') == '(supervisor)') {
      this.productionsService.deleteTask(datadelev.id).subscribe(
        (response) => {
          console.log('Réponse de suppression:', response);
          location.reload();
        },
        (error) => {
          console.error('Erreur lors de la suppression', error);
        }
      );
    } else {
      alert('You must be a supervisor to delete a task');
    }
  }

  //change
  //name

  change(event: { task: any; index: number }) {
    this.trigger_name[event.index] = !this.trigger_name[event.index];
    console.log(`message :${this.trigger_name}`);
    console.log('message :', event.index);
  }
  //sup
  changesup(event: { task: any; index: number }) {
    this.trigger_supervisor[event.index] =
      !this.trigger_supervisor[event.index];
    console.log(`message :${this.trigger_supervisor}`);
    console.log('message :', event.index);
  }

  //artist
  changeartist(event: { task: any; index: number }) {
    this.trigger_artist[event.index] = !this.trigger_artist[event.index];
    console.log(`message :${this.trigger_artist}`);
    console.log('message :', event.index);
  }

  //date

  changedate(event: { task: any; index: number }) {
    this.trigger_date[event.index] = !this.trigger_date[event.index];
    console.log(`message :${this.trigger_date}`);
    console.log('message :', event.index);
  }

  //status

  changestatus(event: { task: any; index: number }) {
    this.trigger_status[event.index] = !this.trigger_status[event.index];
    console.log(`message :${this.trigger_status}`);
    console.log('message :', event.index);
  }
}
