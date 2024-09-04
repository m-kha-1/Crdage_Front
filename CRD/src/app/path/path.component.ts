import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-path',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './path.component.html',
  styleUrl: './path.component.css'
})
export class PathComponent {

  value:string = '';

  enterPath() {
   
    console.log(`path : ${this.value}`);
    window.localStorage.setItem('path', this.value);
  }

}
