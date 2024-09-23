import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // Directive marquant la classe ProductionsService comme étant un service injectable dans toute l'application (root)
})
export class ProductionsService {
  // URL de base pour l'API
  // url = 'https://crdage-back.onrender.com';
  url = 'http://127.0.0.1:8000';

  // Endpoints
 

  public id: any;

  constructor(private http: HttpClient) {} // Injection du service HttpClient

  // Récupère la liste de toutes les productions depuis l'API
  getProductions(): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });

      return this.http.get<any[]>(`${this.url}/productions`, { headers });
    } else {
      // Retourner un Observable vide ou une valeur par défaut
      return of([]);
    }
  }

  // Récupère la liste des tâches associées à une production spécifique en fonction de son ID
  loadTasksByProductionId(Id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/get_task2_ids_by_production/${Id}`);
  }

  // Récupère la liste des producteurs depuis l'API
  loadProducer(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/producer/`);
  }

  loadCgArtist(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/artists/`);
  }

  loadSupervisor(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/supervisors/`);
  }

  // Crée une nouvelle production en envoyant les données du formulaire à l'API
  createNewProduction(formData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/change`, formData);
  }

  createNewTask(formData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/newtask2`, formData);
  }

  deleteTask(Id: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.url}/deleteTask/${Id}`);
  }

  loadTask(Id: number): Observable<any[]> {
    return this.http.get<any>(`${this.url}/task2/${Id}`);
  }

  incrementTask(Id: number): Observable<any> {
    const body = {};
    return this.http.put<any>(`${this.url}/updatetask2version/${Id}`, body);
  }

  listVersionsPublished(organization: string, np: string, tt: string, nt: string): Observable<any> {
    return this.http.get<any>(`${this.url}/call_listei/${np}/${tt}/${nt}`);
  }

  listScenesPublished(organization: string, np: string, tt: string, nt: string): Observable<any> {
    return this.http.get<any>(`${this.url}/call_listes/${np}/${tt}/${nt}`);
  }

  image_production(np: number): Observable<any> {
    return this.http.get<any>(`${this.url}/image/${np}/`);
  }

  launch_scene(scenePath: string): Observable<any> {
    const body = { blend_file_path: scenePath };
    return this.http.post<any>(`${this.url}/launch_scene/`, body);
  }

  CommentSup(id: number, commentaire: any): Observable<any> {
    return this.http.put<any>(`${this.url}/updatetask2/${id}/`, commentaire);
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.url}/api/auth/token/`, { username, password })
      .pipe(
        map((response) => {
          // Stocke le token dans le stockage local
          const token = response.access;
          localStorage.setItem('token', token);
          console.log('réponse ::', response);
          return response;
        })
      );
  }


  changePath(data :{path:string}): Observable<any>{
    return this.http.put<any>(`${this.url}/changepath/1/`,data)}

//update 
  updateTaskName(data :{name:string},id:number): Observable<any>{
    return this.http.put<any>(`${this.url}/updateTaskName/${id}`,data)
  }

  updateSup(data :{supervisor2ID:string},id:number): Observable<any>{
    return this.http.put<any>(`${this.url}/updatesup/${id}`,data)
  }


  updateArtist(data :{cgArtist3Id:string},id:number): Observable<any>{
    return this.http.put<any>(`${this.url}/updateartist/${id}`,data)
  }


  updateDate(data :{dateDue:string},id:number): Observable<any>{
    return this.http.put<any>(`${this.url}/updateduedate/${id}`,data)
  }

  updateStatus(data :{completed:string},id:number): Observable<any>{
    return this.http.put<any>(`${this.url}/updatestatus/${id}`,data)
  }






}
