// // import { Injectable } from '@angular/core';
// // import { BehaviorSubject } from 'rxjs';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class ComponentCommunicatorService {

 

// //   // private data: any;
// //   private data = new BehaviorSubject<{ id: number, name: string | null } >({ id: 0, name: null });

// //   constructor() { }

// //   setData(data: any): void {
// //     // this.data = data;
// //     this.data = data;
   
// //   }

// //   getData(): BehaviorSubject<{ id: number, name: string | null }> {
// //     return this.data;
// //     console.log("service retour",this.data);
// //   }
// // }

// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ComponentCommunicatorService {
//   private sharedValueSubject: BehaviorSubject<{}> = new BehaviorSubject<any>({});
//   private sharedValueKey: string = 'sharedValue';
//   // constructor() {}

//   constructor() {
//     if (typeof window !== 'undefined') {
//     const storedValue = window.localStorage.getItem(this.sharedValueKey);
//     this.sharedValueSubject = new BehaviorSubject<any>(storedValue ? JSON.parse(storedValue) : null);}
//   }

//   setSharedValue(value: {id:number,name:string,auteur:string}): void {
//     this.sharedValueSubject.next(value);
   
//   }
//   setSharedValueAny(value: any): void {
//     this.sharedValueSubject.next(value);
//     console.log(" message du service:exporté",value);

//   }

//   getSharedValue(): BehaviorSubject<any> {
//     return this.sharedValueSubject;
//     console.log(" message du service:importé",this.sharedValueSubject);
//   }
// }






import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inject } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ComponentCommunicatorService {
//   private sharedValueSubject: BehaviorSubject<any>;
//   private sharedValueKey: string ;

//   constructor() {
//     this.sharedValueKey="cle";
//     const storedValue = localStorage.getItem(this.sharedValueKey);
//     this.sharedValueSubject = new BehaviorSubject<any>(storedValue ? JSON.parse(storedValue) : null);
//   }

//   setSharedValue(value: any): void {
//     this.sharedValueSubject.next(value);
//     localStorage.setItem(this.sharedValueKey, JSON.stringify(value));
//   }

//   getSharedValue(): BehaviorSubject<any> {
//     return this.sharedValueSubject;
//   }
// }



Injectable({
  providedIn: 'root'
})
export class ComponentCommunicatorService {
  private sharedValueSubject: BehaviorSubject<{}> = new BehaviorSubject<any>({});

  constructor() {}

  setSharedValue(value:any): void {
    this.sharedValueSubject.next(value);
  }

  getSharedValue(): BehaviorSubject<any> {
    return this.sharedValueSubject;
  }
}
