import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/models/dog.model';

@Component({
  selector: 'app-dog-adoptees',
  templateUrl: './dog-adoptees.page.html',
  styleUrls: ['./dog-adoptees.page.scss'],
})
export class DogAdopteesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  Adoptees = [
    {
      id: '12345',
      name: 'Isaac1'
    },
    {
      id: '23456',
      name: 'Isaac2'
    }
  ];

  /* deleteAdoptee(adopteeId: string) {
    this.itemService
      .deleteItem(itemId)
      .then(() => {
        this.Alert();
      })
      .catch(error => {
        console.log(error);
      });
  } */
}
