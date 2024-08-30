import { Component,OnInit } from '@angular/core';

import { ComponentCommunicatorService } from '../component-communicator-service.service';
import { CommonModule } from '@angular/common';
import { ProductionsService } from '../productions.service';
import { FormsModule } from '@angular/forms';



export class Task2{

  "id": number
  "producer_name": string
  "production_name": string
  "cgSupervisor_name": string
  "cgArtist_name": string
  "name":string
  "type": string
  "dateCreated": string
  "dateDue": string
  "commentsCgArtist": Object
  "commentsSupervisor": Object
  "commentsProducer": Object
  "producerID": number
  "supervisorID": number
  "cgArtistId": number
  "PRODUCTIONid": number

  constructor(id:number,producer_name:string,production_name:string,cgSupervisor_name:string,cgArtist:string,name:string,type:string,
    dateCreated:string,dateDue:string,commentsCgArtist:Object,commentsSupervisor:Object,commentsProducer:Object,producerID:number,supervisorID:number,cgArtistId:number,PRODUCTIONid:number){
    this.id=id;
    this.producer_name=producer_name;
    this.production_name=production_name;
    this.cgArtist_name=cgArtist;
    this.cgSupervisor_name=cgSupervisor_name;
    this.type=type;
    this.dateCreated=dateCreated;
    this.dateDue=dateDue;
    this.commentsCgArtist=commentsCgArtist;
    this.commentsSupervisor=commentsSupervisor;
    this.commentsProducer=commentsProducer;
    this.producerID=producerID;
    this.supervisorID=supervisorID;
    this.cgArtistId=cgArtistId;
    this.PRODUCTIONid=PRODUCTIONid



  }
}




@Component({
  selector: 'app-tskdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tskdetails.component.html',
  styleUrl: './tskdetails.component.css'
})
export class TskdetailsComponent {
  sharedValue!:Task2
  
  supervisorComments:{}={}





  constructor(private communicatorService:ComponentCommunicatorService,private productionsService:ProductionsService){

}

ngOnInit()
{ this.communicatorService.getSharedValue().subscribe((data:Task2) =>this.sharedValue = data);
  console.log("comments: ",this.sharedValue.commentsSupervisor);}





}
