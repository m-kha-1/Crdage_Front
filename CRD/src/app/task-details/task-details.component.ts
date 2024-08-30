import { Component, ViewChildren, QueryList, ElementRef  } from '@angular/core';
import { ComponentCommunicatorService } from '../component-communicator-service.service';
import { CommonModule } from '@angular/common';
import { ProductionsService } from '../productions.service';
import { FormsModule } from '@angular/forms';
import { stringify } from 'querystring';
// import { Task } from '../production/task_in';
import { throwError } from 'rxjs';
import { HeaderComponent } from '../header/header.component';

type Comments = {
  [key: string]: any; // Ou spécifiez le type de valeur si connu
};

export class Task2{

  "id": number
  "producer_name": string
  "production_name": string
  "cgSupervisor2_name": string
  "cgArtist_name": string
  "name":string
  "type": string
  "dateCreated": string
  "dateDue": string
  "commentsCgArtist": Object
  "comments_supervisor2": Comments
  "commentsProducer": Object
  "producerID": number
  "supervisorID": number
  "cgArtistId": number
  "PRODUCTIONid": number

  constructor(id:number,producer_name:string,production_name:string,cgSupervisor2_name:string,cgArtist:string,name:string,type:string,
    dateCreated:string,dateDue:string,commentsCgArtist:Object,comments_supervisor2:Comments,commentsProducer:Object,producerID:number,supervisorID:number,cgArtistId:number,PRODUCTIONid:number){
    this.id=id;
    this.producer_name=producer_name;
    this.production_name=production_name;
    this.cgArtist_name=cgArtist;
    this.cgSupervisor2_name=cgSupervisor2_name;
    this.type=type;
    this.dateCreated=dateCreated;
    this.dateDue=dateDue;
    this.commentsCgArtist=commentsCgArtist;
    this.comments_supervisor2=comments_supervisor2;
    this.commentsProducer=commentsProducer;
    this.producerID=producerID;
    this.supervisorID=supervisorID;
    this.cgArtistId=cgArtistId;
    this.PRODUCTIONid=PRODUCTIONid



  }
}


@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [HeaderComponent,CommonModule,FormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})






export class TaskDetailsComponent {
  constructor(private productionsService:ProductionsService) {}
  pathTask:string = ''
  sharedValue!:Task2;

  urls:string[] =[]

  prefixUrl:string ="http://localhost:8080"

  scenes:string[]=[]
  images:string[]=[]
  length:number=0

  imagePath: string="";
  nbComments!:number;
  commentsArray!:Array<number>;

  commentsCgArtist!:Array<string>;
  commentInput: string[] = [];
  indexToEnableInput: number = 0; 
  commentSup:{}={}
  dataTaskString!:Task2

  jsonNataskTytaskComm!:{"name":{},"type":{},"comments_supervisor2":{}}

  organization:string |null=null

  basedir:string='C:\\CORD\\'


//  testpath:string="C:\\CORD\\ProductionC3\\lighting\\LIGHTING\\PUBLISH\\scenes\\lgt2.blend"

  launch(scenePath:string){
    console.log("scene",scenePath);
    this.productionsService.launch_scene(scenePath).subscribe( {next:(response)=>{console.log(response)},
    error:error=>{console.log(error)}}
     

    )

  }

  commentS(i: number, commentaire: string) {
    
    const jsonCommentaire = { [i]: commentaire };
    this.productionsService.CommentSup(this.sharedValue.id, jsonCommentaire).subscribe(
      comment => {
        // Réponse du serveur, si nécessaire
      },
      error => {
        console.error('Erreur lors de l\'envoi du commentaire:', error);
      }
    );
  }
  

  // pathToUrl(urls: string[]): string[] {
  //   // Utiliser map pour transformer chaque URL et retourner le tableau modifié
  //   const updatedUrls = urls.map(url => url.replace(/\\/g, '/'));
  //   console.log("nouveaux urls: ", updatedUrls,this.organization); // Afficher les URLs mises à jour
  //   return updatedUrls; // Retourner le tableau modifié
  // }

  pathToUrl(urls: string[]): string[] {
    return urls.map(url => {
      // Remplacer les backslashes par des slashes
      const normalizedPath = url.replace(/\\/g, '/');
      console.log("Normalized Path:", normalizedPath);
      
      // Retirer le chemin de base local du début du chemin
      const baseDirInUrl = this.basedir.replace(/\\/g, '/');
      const relativePath = normalizedPath.replace(baseDirInUrl, '');
      console.log("Relative Path:", relativePath);

      // Créer l'URL finale
      const finalUrl = `${this.prefixUrl}/${relativePath}`;
      console.log("Final URL:", finalUrl);
      

      return finalUrl;


    });
  }
  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef>;

  onImageClick(index: number): void {
    console.log(`Image clicked at index ${index}`);
    const fileInput = this.fileInputs.toArray()[index]; // Accédez à l'input correspondant
    if (fileInput) {
      fileInput.nativeElement.click(); // Déclenche le clic sur l'input de fichier
    }
  }

  // Méthode pour gérer la sélection de fichier
  onFileSelected(event: Event, index: number): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log(`Selected file name: ${file.name}`);
      console.log(`File size: ${file.size} bytes`);
      console.log(`File type: ${file.type}`);
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls[index] = e.target.result; // URL de données de l'image en base64
        
        // Afficher l'URL de données dans la console
        console.log(`Data URL for image at index ${index}: ${this.urls[index]}`);
      };
      reader.readAsDataURL(file); // Lire le fichier comme une URL de données
    }
  }


  comment(i:number,commentaire:string){
    if (localStorage.getItem('userType')=="(supervisor)"){
    this.dataTaskString.comments_supervisor2[String(i)]=commentaire;
    console.log('après : ',this.dataTaskString.comments_supervisor2);
    this.jsonNataskTytaskComm={"name":this.dataTaskString.name,"type":this.dataTaskString.type,"comments_supervisor2":this.dataTaskString.comments_supervisor2}
    console.log("jsonNataskTytaskComm : ",this.jsonNataskTytaskComm,JSON.stringify( this.jsonNataskTytaskComm))
    const stringNataskTytaskComm=JSON.stringify( this.jsonNataskTytaskComm)
    this.productionsService.CommentSup(this.dataTaskString.id,this.jsonNataskTytaskComm).subscribe()
    const taskdataCurrentValue =localStorage.getItem('taskData') 
    if (taskdataCurrentValue!=null){
      const taskdataCurrentValueJson = JSON.parse(taskdataCurrentValue)
      console.log("détails de local storage actuel",this.dataTaskString.comments_supervisor2)
      taskdataCurrentValueJson.comments_supervisor2=this.dataTaskString.comments_supervisor2
      console.log("détails de local storage apres modifications",JSON.stringify(taskdataCurrentValueJson))
      window.localStorage.setItem('taskData',JSON.stringify(taskdataCurrentValueJson))

    }
  }else {alert("You must be a supervisor to make a comment !");}


  }


  ngOnInit(){


  
  const dataTask = localStorage.getItem('taskData') ;
  if(dataTask !=null){
  console.log("dataTaskString",JSON.parse(dataTask));
  this.dataTaskString=JSON.parse(dataTask)

  this.organization=localStorage.getItem('userOrganization') ;
  console.log("organization : ", this.organization) ;
  
 
  console.log("dataTask details:", Object.keys(this.dataTaskString.comments_supervisor2));
  console.log("dataTask2 details:", Object.values(this.dataTaskString.comments_supervisor2));

}

  // if (this.organization!=null){console.log("organization : ",this.organization)
  // this.productionsService.listVersionsPublished(this.organization,this.dataTaskString.production_name,this.dataTaskString.type,this.dataTaskString.name).subscribe((data:any) =>{
  //   this.urls= data; console.log("images",this.urls);
  //   this.pathToUrl(this.urls) });
  // }

  if (this.organization!=null){console.log("organization : ",this.organization)
  this.productionsService.listVersionsPublished(this.organization,this.dataTaskString.production_name,this.dataTaskString.type,this.dataTaskString.name).subscribe((data:any) =>{
    this.urls=   this.pathToUrl(data); console.log("images",this.urls);
   });
  }




  if (this.organization!=null){
  this.productionsService.listScenesPublished(this.organization,this.dataTaskString.production_name,this.dataTaskString.type,this.dataTaskString.name).subscribe((data:any) =>{this.scenes= data;  console.log("scenes:",this.scenes)})
  }

  }
  

}


