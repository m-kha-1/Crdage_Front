import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductionsService } from '../productions.service';

@Component({
  selector: 'app-path',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './path.component.html',
  styleUrl: './path.component.css',
})
export class PathComponent {
  formdata = { path: 'yyyyyyyyyyyyy' };

  input: string = '';
  formdt = { path: this.input };

  constructor(private prodserv: ProductionsService) {}

  form() {
    this.formdt = { path: this.input };
    console.log('données :', this.formdt);

    this.prodserv.changePath(this.formdt).subscribe(
      (response) => console.log('sup', response),
      (error) => console.log(error)
    );
  }

  enterPath() {
    this.prodserv.changePath(this.formdata).subscribe(
      (response) => {
        console.log('Path updated successfully:', response);
        this.input="";this.formdt = { path: this.input };
      },
      (error) => {
        console.error('Error updating path:', error);
      }
    );
    console.log(`path : ${this.formdata}`);
    
  }
}
