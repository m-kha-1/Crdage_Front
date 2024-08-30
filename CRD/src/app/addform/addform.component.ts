import { Component,OnInit
 } from '@angular/core';
import { ProductionsService } from '../productions.service';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { NgForm } from '@angular/forms';


// Classe représentant un chargé de prod
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
  selector: 'app-addform',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './addform.component.html',
  styleUrl: './addform.component.css'
})
export class AddformComponent  implements OnInit {

  producer: Producer[]=[]
  productionCreated:any
  
  
  producerList: any  //variable qui prendra les différents producteurs disponibles
  
  selectedProducers:Producer[]=[]
  
  formData={
  
    name:"",
    client:"",
    producers:[] as number[]
   
  }
  constructor(private productionsService: ProductionsService){}
  ngOnInit(): void {this.resetForm();this.loadProducer();}
 
  // Appelle Méthode loadProducer définie dans le service productionsService pour charger les producteurs disponibles qui seront affectés à la variable
  //producerList définie ci dessus. Methode retourne un observable auquel on souscrit;

  loadProducer_mi(){
    this.producerList=this.productionsService.loadProducer().subscribe((data:any) => this.producerList=data);console.log("la liste de producteurs est : ",this.producerList);   
  }
  loadProducer(){
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






  onSubmit(form: NgForm){
 

    if (form.valid) {
      this.formData.producers = this.selectedProducers.map(producer => producer.id);
      this.productionsService.createNewProduction(this.formData).subscribe((response) => {
        console.log('Production créée :', response);
        // Mettez à jour la variable productionCreated pour afficher le message de succès
        this.productionCreated = true;
        this.resetForm();
      
      });
    } else {
      console.log('Form submission failed. Form is invalid.');
    }
    this.productionCreated = false;

  }

  // méthode pour mettre à jour les producteurs sélectionnés dans le formulaire.
  updateSelectedProducers(): void {
    this.formData.producers = this.producerList.filter((producer: Producer) => producer.selected).map((producer: Producer) => producer.id); 
    // filtrer les producteurs sélectionnés en fonction de la propriété isChecked
    //mapper chaque producteur sélectionné à son ID et les stocker dans un tableau
    console.log(this.formData)
  }

//méthode pour réinitialiser le formulaire


 
    
  
  resetForm():void{
    this.formData={
      name:'',
      client:'',
      producers:[]
    };
  }
}

