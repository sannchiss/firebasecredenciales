import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExecutiveFirebaseService {

  constructor(private firestore:AngularFirestore) {}


/**
 * Metodo para obtener todos los ejecutivos *
 */
getExecutive(){
  return this.firestore.collection("executives").snapshotChanges();
}
/**Metodo para crear executivos
 *
*/
createExecutive(executives:any){
  return this.firestore.collection("executives").add(executives);
}

updateExecutive(id:any , executives:any){
  return this.firestore.collection("executives").doc(id).update(executives);
}

deleteExecutive(idFirebase:any){
  return this.firestore.collection("executives").doc(idFirebase).delete();

}
}
