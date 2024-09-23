import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../production/task_in';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComponentCommunicatorService } from '../component-communicator-service.service';
import { FormsModule } from '@angular/forms';
import { ProductionsService } from '../productions.service';
import { Router } from '@angular/router';
import { ProductionIdtasksComponent } from '../production-idtasks/production-idtasks.component';

import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
interface dates {
  year: string;
  month: string;
  day: string;
}

@Component({
  selector: 'app-production-id-ttask',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ProductionIdtasksComponent,
    NgbDatepickerModule,
  ],
  templateUrl: './production-id-ttask.component.html',
  styleUrl: './production-id-ttask.component.css',
})
//TabViewModule, FormsModule, NgbAlertModule, NgbDatepickerModule
// interface Sup{"name":string}
export class ProductionIdTtaskComponent {
  constructor(
    private prodservice: ProductionsService,
    private router: Router
  ) {}

  inputvalue: any;
  inputvalueSup: any;
  newName: string = '';

  dateDue: string = '';

  selectedSupervisor: any[] = [];
  selectedArtist: any[] = [];
  selectedDate: dates = { year: '', month: '', day: '' };
  selectedStatus: string = 'false';

  @Input() on: boolean = false;
  @Input() onsup: boolean = false;
  @Input() onartist: boolean = false;
  @Input() ondate: boolean = false;
  @Input() onstatus: boolean = false;

  @Input() sup: { name: string }[] = [];
  @Input() artist: { name: string }[] = [];

  @Input()
  task!: Task;
  // Pour stocker le nouveau nom saisi par l'utilisateur

  @Input() index: number = 0;
  getClasses() {
    return {
      'card-col2': this.task.completed === false,
      'card-col': this.task.completed === true,
    };
  }

  @Output()
  evenementTask: EventEmitter<any> = new EventEmitter();

  @Output()
  evenementTaskDelete: EventEmitter<any> = new EventEmitter();

  @Output()
  evenementTaskChange: EventEmitter<any> = new EventEmitter();

  @Output()
  evenementTaskChangeSup: EventEmitter<any> = new EventEmitter();

  @Output()
  evenementTaskChangeArtist: EventEmitter<any> = new EventEmitter();

  @Output()
  evenementTaskChangeDate: EventEmitter<any> = new EventEmitter();

  @Output()
  evenementTaskChangeStatus: EventEmitter<any> = new EventEmitter();

  task2 = { name: 'Example Task' }; // Exemple de tâche

  editing: boolean = false; // Pour contrôler l'affichage du formulaire

  // Méthode appelée lors du clic sur le lien
  onTaskClick() {
    this.editing = true; // Afficher le formulaire de saisie
    this.newName = this.task2.name; // Pré-remplir le champ avec le nom actuel
  }

  // details
  clickTask() {
    this.evenementTask.emit(this.task);
  }
  //delete
  clickDelete() {
    this.evenementTaskDelete.emit(this.task);
  }

  clickChange(task: any, index: number, event: Event) {
    event.preventDefault();
    this.evenementTaskChange.emit({ index, task });
  }
  clickChangeSup(task: any, index: number, event: Event) {
    event.preventDefault();
    this.evenementTaskChangeSup.emit({ index, task });
  }
  clickChangeArtist(task: any, index: number, event: Event) {
    event.preventDefault();
    this.evenementTaskChangeArtist.emit({ index, task });
  }

  clickChangeDate(task: any, index: number, event: Event) {
    event.preventDefault();
    this.evenementTaskChangeDate.emit({ index, task });
  }
  clickChangeStatus(task: any, index: number, event: Event) {
    event.preventDefault();
    this.evenementTaskChangeStatus.emit({ index, task });
  }

  // clickChangeB(task: any, index: number) {

  //   this.evenementTaskChange.emit({ index, task });
  //   console.log(task,index,"clickchange activé");
  // }

  upName() {
    console.log(this.inputvalue);
    console.log('this.index', this.index);
    this.prodservice
      .updateTaskName({ name: this.inputvalue }, this.task.id)
      .subscribe((response) => {
        console.log('nom de la tâche est maintenant :', response.name);
        location.reload();
      });
  }

  upSup() {
    console.log('nom du sup est  :', this.selectedSupervisor[0].name);
    this.prodservice
      .updateSup(
        { supervisor2ID: this.selectedSupervisor[0].name },
        this.task.id
      )
      .subscribe((response) => {
        console.log('nom du sup est maintenant :', response);
        location.reload();
      });
  }
  upDate() {
    let dte = `${this.selectedDate.year}-${this.selectedDate.month}-${this.selectedDate.day}`;
    console.log(
      'dateDue est maintenant :',
      `${this.selectedDate.year}-${this.selectedDate.month}-${this.selectedDate.day}`,
      'TYPE :',
      typeof this.selectedDate
    );
    this.prodservice
      .updateDate({ dateDue: dte }, this.task.id)
      .subscribe((response) => {
        console.log('dateDue est maintenant :', dte);
        location.reload();
      });
  }

  upArtist() {
    console.log('nom du artiste est  :', this.selectedArtist[0].name);
    this.prodservice
      .updateArtist({ cgArtist3Id: this.selectedArtist[0].name }, this.task.id)
      .subscribe((response) => {
        console.log('nom du artiste est maintenant :', response);
        location.reload();
      });
  }

  upStatus() {
    console.log(
      'nom du status :',
      this.task.completed,
      !this.task.completed,
      typeof this.task.completed
    );
    this.prodservice
      .updateStatus(
        { completed: (!this.task.completed).toString() },
        this.task.id
      )
      .subscribe((response) => {
        console.log('statut est maintenant :', response);
        location.reload();
      });
  }

  //  onStatusClick(){}
  //  onArtistClick(){}
  //  onSupervisorClick(){}
  //  onDateDueClick(){}
  //  onDateCreatedClick(){}
  //  onTypeClick(){}
}
