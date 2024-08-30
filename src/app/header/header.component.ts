import { Component } from '@angular/core';
import { MinLogComponent } from '../min-log/min-log.component';
import { Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MinLogComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  infoName!:string | null;
  infoRole!:string | null;
   
  determineTextColor() {
    // Logique pour déterminer la couleur en fonction de infoName ou infoRole
    // Par exemple :
    if (this.infoName === 'Unknown username or bad password') {
        return 'red'; // Texte vert pour le rôle "Admin"
    } else {
        return 'blue'; // Texte rouge pour tous les autres rôles
    }


  }
   ngOnInit() { this.infoName= localStorage.getItem('userName');
    this.infoRole= localStorage.getItem('userType')
    

    }


   
  }

