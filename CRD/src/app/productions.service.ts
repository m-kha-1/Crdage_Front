import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable,of } from 'rxjs';
import {map} from 'rxjs/operators'
import { Comment } from '@angular/compiler';


// Service productiosnService :
//injection du service HttpClient qui me permet de faire appel à mon API qui pouura être injecté dans tous les composants de mon application
//utilise les fonctionnalités HTTP telles que définies dans mon API
//compsé de méthodes qui retournent ebservables qui représentent un flux de données asynchrones







@Injectable({                                       //directive marquant la classe ProductionsService comme étant un service injectble dans toute l'application (root)
  providedIn: 'root'
})
export class ProductionsService {

  // url = 'http://127.0.0.1:8000'  // URL de base pour l'API
  url = 'https://crdage-back.onrender.com'  // URL de base pour l'API


  //  endpoint obtenir liste des productions
  url1 = 'http://127.0.0.1:8000/productions'


  //  endpoint obtenir liste des tâches associées à l'id d'une production

  url2 = 'http://127.0.0.1:8000/get_task2_ids_by_production/<int:production_id>/'


  public id: any

  constructor(private http: HttpClient) { }   //injection du service HttpClient : permet au service ProductionService d'utiliser les fonctionnalités HTTP telles que définies dans mon API



  // Récupère la liste de toutes les productions depuis l'API
  //retourne un observable (représentant un flux de données asynchrones) qui "émet" les données récupéres

  getProductions(): Observable<any[]> {

    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    
      return this.http.get<any[]>(this.url + '/productions',{ headers });
    }
    else {
      // Retourner un Observable vide ou une valeur par défaut
      return of([]);}
    
  }

  // Récupère la liste des tâches associées à une production spécifique en fonction de son ID depuis l'API
  //retourne un observable (représentant un flux de données asynchrones) qui "émet" les données récupéres
  loadTasksByProductionId(Id: number): Observable<any[]> {

    return this.http.get<any[]>(`${this.url}/get_task2_ids_by_production/${Id}`)
  }
  // Récupère la liste des producteurs depuis l'API
  //retourne un observable (représentant un flux de données asynchrones) qui "émet" les données récupéres

  loadProducer(): Observable<any[]> {

    return this.http.get<any[]>(`${this.url}/producer/`)
  }
  loadCgArtist(): Observable<any[]> {

    return this.http.get<any[]>(`${this.url}/artists/`)
  }
  loadSupervisor(): Observable<any[]> {

    return this.http.get<any[]>(`${this.url}/supervisors/`)
  }





  // Crée une nouvelle production en envoyant les données du formulaire à l'API
  //retourne un observable qui représente l'état de la requête post
  createNewProduction(formData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/change`, formData)

  }

  createNewTask(formData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/newtask2`, formData)

  }

  deleteTask(Id: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.url}/deleteTask/${Id}`)
  }

  loadTask(Id: number): Observable<any[]> {
    return this.http.get<any>(`${this.url}/task2/${Id}`)

  }

  incrementTask(Id: number): Observable<any> {
    const body = {}
    return this.http.put<any>(`${this.url}/updatetask2version/${Id}`, body)

  }

  
  listVersionsPublished(organization : string,np: string, tt: string, nt: string): Observable<any> {

    return this.http.get<any>(`${this.url}/liste-images/${organization}/${np}/${tt}/${nt}/`)
  }
  listScenesPublished(organization : string, np: string, tt: string, nt: string): Observable<any> {

    return this.http.get<any>(`${this.url}/liste-scenes2/${organization}/${np}/${tt}/${nt}/`)
  }



  image_production(np: string): Observable<any> {

    return this.http.get<any>(`${this.url}/image_production/${np}/`)

  }

  launch_scene(scenePath:string):Observable<any> {
    const body={blend_file_path:scenePath}
    return this.http.post<any>(`${this.url}/api/lancer_scene/`,body)

  }






  CommentSup(id: number, commentaire: any): Observable<any> {
    return this.http.put<any>(`${this.url}/updatetask2/${id}/`, commentaire);
  }


  login(username: string, password: string) {
    // return this.http.post<any>('http://127.0.0.1:8000/api/auth/token/', { username, password })
    return this.http.post<any>(`${this.url}/api/auth/token/`, { username, password })
      .pipe(map(response => {
        // Stocke  token dans le stockage local 
        const respon=response
        const token = response.access;
        const userType = response.user_type;
        const userOrganization = response.user_organization;
       
        localStorage.setItem('token', token);
        console.log("réponse ::",respon)
        // localStorage.setItem('userType', userType);
        // localStorage.setItem('password', password);
        return response;
      }));


  
  }


}

