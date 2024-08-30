import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Task } from '../production/task_in';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComponentCommunicatorService } from '../component-communicator-service.service'; 

@Component({
  selector: 'app-production-id-ttask',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './production-id-ttask.component.html',
  styleUrl: './production-id-ttask.component.css'
})
export class ProductionIdTtaskComponent {

  constructor(){
    communicatorservice : ComponentCommunicatorService
  }

  @Input()
  task!: Task;

  getClasses() {
    return {
       'card-col2': this.task.completed ===false,
       'card-col': this.task.completed ===true,
    };
   }






  @Output()
  evenementTask: EventEmitter<any>=new EventEmitter();

  @Output()
  evenementTaskDelete: EventEmitter<any>=new EventEmitter();


  clickTask(){
  this.evenementTask.emit(this.task);
 }

 clickDelete(){
  this.evenementTaskDelete.emit(this.task);
 }
}


