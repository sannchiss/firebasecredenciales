import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) {}



/**
 * Metodo para obtener todos los usuarios creados *
 */
  getUser(){
    return this.firestore.collection("users").snapshotChanges();
  }

  createUser(user:any){
    return this.firestore.collection("users").add(user);
  }

  updateUser(id:any, user:any){
    return this.firestore.collection("users").doc(id).update(user);
  }

  deleteUser(idFirebase:any){
    return this.firestore.collection("users").doc(idFirebase).delete();
  }


} //FirebaseService End
