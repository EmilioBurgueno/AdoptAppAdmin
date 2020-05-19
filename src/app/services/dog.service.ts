import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Dog } from 'src/models/dog.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private afs: AngularFirestore) { }

  createDog(dog: any) {
    return this.afs.doc(`dogs/${dog.id}`).set(dog);
  }

  getDog(dId: string) {
    return this.afs.doc(`dogs/${dId}`).valueChanges();
  }

  getDogs() {
    return this.afs.collection('dogs').snapshotChanges().pipe(
      map(docs => docs.map(doc => {
        const dog = doc.payload.doc.data() as any;
        const id = doc.payload.doc.id;

        return { id, ...dog } as Dog;
      }))
    )
  }

  updateDog(dId: string, updatedDog: any) {
    return this.afs.doc(`dogs/${dId}`).update(updatedDog);
  }

  deleteDog(dId: string) {
    return this.afs.doc(`dogs/${dId}`).delete();
  }
}


