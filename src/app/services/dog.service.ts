import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private afs: AngularFirestore) { }

  createDog(dog:any){
    return this.afs.doc(`users/${dog.dogusername}`).set(dog);
  }

  getDog(dId: string){
    return this.afs.collection('dogs',ref => ref
    .where('id','==',dId))
    .valueChanges();
  }
}


