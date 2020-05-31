import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/models/dog.model';
import { DogService } from 'src/app/services/dog.service';
import { NavController } from '@ionic/angular';
import * as _ from 'lodash';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  Dogs: Dog[] = [];
  user: any;
  filteredDogs: any;
  dogList: any;

  sex: string;
  size: string;
  breed: string;
  age: string;
  found: string;

  filters = {}

  constructor(private dogService: DogService,
              private authService: AuthService,
              private userService: UserService,
              private navCtrl: NavController,
              ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user
    })
   this.getDogs();

  //  this.dogService.getDogs().subscribe(dogs => {
  //    this.dogList = dogs;
  //    this.applyFilters();
  //  });

   this.dogList = this.getDogs();
   console.log(this.dogList);
  }

  private applyFilters() {
    this.filteredDogs = _.filter(this.dogList, _.conforms(this.filters) )
  }

  filterExact( property: string, rule: any) {
    this.filters[property] = val => val == rule
    this.applyFilters()
  }

  removeFilter(property: string) {
    delete this.filters[property]
    this[property] = null
    this.applyFilters();
  }
  //no jalar todos los perros, jalar por paginacion (ie 20 perros, otros 02 y asi (como los posts)) where

  // funciones

  getDogs() {
    // this.dogService.getDogs().subscribe(dogs => {
    //   this.Dogs = dogs;
    // });
    this.Dogs = [
      {
        id: '001',
        name: 'Scooby-Doo1',
        sex: 'Femenino',
        size: 'Grande',
        breed: 'Gran Danés',
        age: '7 años',
        fplace: 'Crystal Cove',
        found: 'Si',
        description: 'Tiene un collar azul, sabe hablar',
        collar: 'SD',
        status: 'Sano y bien alimentado',
        profilepic: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a14ed940-b1b9-4558-8fc2-8fa1c48cd274/dd4ha1v-df924ac1-1a66-43fd-8b50-e84ea1f82ce4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYTE0ZWQ5NDAtYjFiOS00NTU4LThmYzItOGZhMWM0OGNkMjc0XC9kZDRoYTF2LWRmOTI0YWMxLTFhNjYtNDNmZC04YjUwLWU4NGVhMWY4MmNlNC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.L0uUIBpusHI_K9dAiJ1nuVFWQCfgUdM8k4atoCqAWsw',
        idPerrera: 'A113'
      },
      {
        id: '002',
        name: 'Scooby-Doo2',
        sex: 'Masculino',
        size: 'Grande',
        breed: 'Gran Danés',
        age: '7 años',
        fplace: 'Crystal Cove',
        found: 'Si',
        description: 'Tiene un collar azul, sabe hablar',
        collar: 'SD',
        status: 'Sano y bien alimentado',
        profilepic: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a14ed940-b1b9-4558-8fc2-8fa1c48cd274/dd4ha1v-df924ac1-1a66-43fd-8b50-e84ea1f82ce4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYTE0ZWQ5NDAtYjFiOS00NTU4LThmYzItOGZhMWM0OGNkMjc0XC9kZDRoYTF2LWRmOTI0YWMxLTFhNjYtNDNmZC04YjUwLWU4NGVhMWY4MmNlNC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.L0uUIBpusHI_K9dAiJ1nuVFWQCfgUdM8k4atoCqAWsw',
        idPerrera: 'A113'
      },
      {
        id: '003',
        name: 'Scooby-Doo3',
        sex: 'Masculino',
        size: 'Grande',
        breed: 'Gran Danés',
        age: '7 años',
        fplace: 'Crystal Cove',
        found: 'No',
        description: 'Tiene un collar azul, sabe hablar',
        collar: 'SD',
        status: 'Sano y bien alimentado',
        profilepic: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a14ed940-b1b9-4558-8fc2-8fa1c48cd274/dd4ha1v-df924ac1-1a66-43fd-8b50-e84ea1f82ce4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYTE0ZWQ5NDAtYjFiOS00NTU4LThmYzItOGZhMWM0OGNkMjc0XC9kZDRoYTF2LWRmOTI0YWMxLTFhNjYtNDNmZC04YjUwLWU4NGVhMWY4MmNlNC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.L0uUIBpusHI_K9dAiJ1nuVFWQCfgUdM8k4atoCqAWsw',
        idPerrera: 'A113'
      },
      {
        id: '004',
        name: 'Scooby-Doo4',
        sex: 'Masculino',
        size: 'Grande',
        breed: 'Gran Danés',
        age: '7 años',
        fplace: 'Crystal Cove',
        found: 'No',
        description: 'Tiene un collar azul, sabe hablar',
        collar: 'SD',
        status: 'Sano y bien alimentado',
        profilepic: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a14ed940-b1b9-4558-8fc2-8fa1c48cd274/dd4ha1v-df924ac1-1a66-43fd-8b50-e84ea1f82ce4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYTE0ZWQ5NDAtYjFiOS00NTU4LThmYzItOGZhMWM0OGNkMjc0XC9kZDRoYTF2LWRmOTI0YWMxLTFhNjYtNDNmZC04YjUwLWU4NGVhMWY4MmNlNC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.L0uUIBpusHI_K9dAiJ1nuVFWQCfgUdM8k4atoCqAWsw',
        idPerrera: 'A113'
      },
      {
        id: '005',
        name: 'Scooby-Doo5',
        sex: 'Masculino',
        size: 'Grande',
        breed: 'Gran Danés',
        age: '7 años',
        fplace: 'Crystal Cove',
        found: 'Si',
        description: 'Tiene un collar azul, sabe hablar',
        collar: 'SD',
        status: 'Sano y bien alimentado',
        profilepic: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a14ed940-b1b9-4558-8fc2-8fa1c48cd274/dd4ha1v-df924ac1-1a66-43fd-8b50-e84ea1f82ce4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYTE0ZWQ5NDAtYjFiOS00NTU4LThmYzItOGZhMWM0OGNkMjc0XC9kZDRoYTF2LWRmOTI0YWMxLTFhNjYtNDNmZC04YjUwLWU4NGVhMWY4MmNlNC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.L0uUIBpusHI_K9dAiJ1nuVFWQCfgUdM8k4atoCqAWsw',
        idPerrera: 'A113'
      },
      {
        id: '006',
        name: 'Scooby-Doo6',
        sex: 'Masculino',
        size: 'Grande',
        breed: 'Gran Danés',
        age: '7 años',
        fplace: 'Crystal Cove',
        found: 'Si',
        description: 'Tiene un collar azul, sabe hablar',
        collar: 'SD',
        status: 'Sano y bien alimentado',
        profilepic: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a14ed940-b1b9-4558-8fc2-8fa1c48cd274/dd4ha1v-df924ac1-1a66-43fd-8b50-e84ea1f82ce4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYTE0ZWQ5NDAtYjFiOS00NTU4LThmYzItOGZhMWM0OGNkMjc0XC9kZDRoYTF2LWRmOTI0YWMxLTFhNjYtNDNmZC04YjUwLWU4NGVhMWY4MmNlNC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.L0uUIBpusHI_K9dAiJ1nuVFWQCfgUdM8k4atoCqAWsw',
        idPerrera: 'A113'
      }
    ]
  }

  goToDesc(dogId: String) {
    this.navCtrl.navigateForward(['tabs', 'feed', dogId])
  }

  toggleLike(dogId: string) {
    if (this.user.favourites.includes(dogId)) {
      this.user.favourites = this.user.favourites.filter((id: string) => id !== dogId)

      this.userService.unfavDog(this.user, dogId).then(() => {
        console.log('disliked');
      }).catch((error) => {
        console.log(error);
      })
    } else {
      this.user.favourites.push(dogId);

      this.userService.favDog(this.user, dogId).then(() => {
        console.log('liked');
      }).catch((error) => {
        console.log(error);
      })
    }
  }

}
