import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Production } from './production_in';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductionsService } from '../productions.service';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './production.component.html',
  styleUrl: './production.component.css',
})
export class ProductionComponent {
  imagePath = { vignette: '' };

  @Input() production: Production | null = null;

  @Output() onProductionClickEvent: EventEmitter<{ id: number; name: string }> =
    new EventEmitter();

  constructor(private productionsService: ProductionsService) {}
  ngOnInit(): void {
    this.loadImage();
  }

  loadImage(): void {
    const np = this.production?.id;
    this.productionsService.image_production(np!).subscribe(
      (data) => {
        this.imagePath = data;
        console.log('VoiciImage path loaded:', this.imagePath);
      },
      (error) => {
        console.error('Error loading image:', error);
      }
    );
  }

  onClick() {
    if (this.production) {
      this.onProductionClickEvent.emit({
        id: this.production.id,
        name: this.production.name,
      });
      console.log('Événement émis avec:', {
        id: this.production.id,
        name: this.production.name,
      });
    }
  }
}
