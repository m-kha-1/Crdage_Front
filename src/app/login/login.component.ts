import { Component } from '@angular/core';
import { ProductionsService } from '../productions.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HeaderVariantAComponent } from '../header-variant-a/header-variant-a.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,HeaderComponent,HeaderVariantAComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username!: string;
  password!: string;
  test:any;

  constructor(private productionsService: ProductionsService,private router: Router) { }


  ngOnInit() {
    window.localStorage.removeItem('userName');
    window.localStorage.removeItem('userType');
    window.localStorage.removeItem('token');


  } 
  
  onSubmit() {
    this.productionsService.login(this.username, this.password).subscribe(
      data => {
        // Traitement en cas de succès de la connexion
        console.log('Connecté avec succès', data);
        localStorage.setItem('userName',this.username);
        localStorage.setItem('userOrganization',data['user_organization']);
        localStorage.setItem('userType','('+data['user_type']+')'
          
        );;
        
        this.router.navigate(['/productions']);
      },
      error => {
        // Traitement en cas d'échec de la connexion
        console.error('Erreur de connexion', error);
      }
 
    );
   


  }

  
  


}