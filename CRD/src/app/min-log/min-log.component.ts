import { Component } from '@angular/core';
import { ProductionsService } from '../productions.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-min-log',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './min-log.component.html',
  styleUrl: './min-log.component.css'
})
export class MinLogComponent {
  username!: string;
  password!: string;
  constructor(private productionsService: ProductionsService,private router: Router) { }
  onSubmit(){
    this.productionsService.login(this.username, this.password).subscribe(
      data => {
        // Traitement en cas de succès de la connexion
        
      
        if (this.router.url === '/productions') {
          // Recharger la page
          location.reload();
        } else {
          // Naviguer vers la page 'productions'
          this.router.navigate(['/productions']);
        }
        if (data.detail=="Invalid credentials"){  console.log('utili non reconnu', data);localStorage.setItem('userName','Unknown username or bad password'),
          localStorage.setItem('userType','');
        

         }else{  console.log('Connecté avec succès', data.detail);
          localStorage.setItem('userName',this.username);
          localStorage.setItem('userOrganization',data['user_organization']);
          localStorage.setItem('userType','('+data['user_type']+')');};
      }
    );
   
  }

}
