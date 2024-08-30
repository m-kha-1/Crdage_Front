import { Component, Input,Output,EventEmitter } from '@angular/core';
import { Production } from './production_in';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { ProductionsService } from '../productions.service';



@Component({
  selector: 'app-production',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './production.component.html',
  styleUrl: './production.component.css'
})
// export class ProductionComponent {

//   @Input() production: Production | null = null;



//   @Output()  
//   onProductionClickEvent : EventEmitter<any> = new EventEmitter();//initialisation de la propriété monevenement 
//                                                                   //ndique que propriété de classe monevenement représente un événement 



//   onClick(){
//     this.onProductionClickEvent.emit(this.production?.id);
//     console.log('id',this.production?.id+"  évènement émis", typeof(this.production?.id));
    
//   }
  




  
// }





export class ProductionComponent {

  imagePath:string=""

  

  @Input() production: Production | null = null;

  @Output() onProductionClickEvent: EventEmitter<{ id: number, name: string }> = new EventEmitter();

  constructor(private productionsService :ProductionsService ){}
  ngOnInit(): void {
    this.loadImage();
  }

  loadImage(): void {
    const np = this.production?.name; // Supposant que l'id de la production est utilisé comme np
    this.productionsService.image_production(np!).subscribe(
      data => {
        this.imagePath = data; // Mettez à jour cette ligne selon la structure de vos données
        console.log('Image path loaded:', this.imagePath);
      },
      error => {
        console.error('Error loading image:', error);
      }
    );
  }

  onClick() {
    if (this.production) {
      this.onProductionClickEvent.emit({ id: this.production.id, name: this.production.name });
      console.log('Événement émis avec:', { id: this.production.id, name: this.production.name });
    }
  }
}