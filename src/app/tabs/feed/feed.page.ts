import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/models/dog.model';
import { DogService } from 'src/app/services/dog.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  Dogs: Dog[] = [];

  constructor(private dogService: DogService,
              private navCtrl: NavController) {}

  ngOnInit() {
   this.getDogs();
  }
  // funciones

  getDogs() {
    // this.dogService.getDogs().subscribe(dogs => {
    //   this.Dogs = dogs;
    // });
    this.Dogs = [
      {
        id: '001',
        name: 'Scooby-Doo',
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
        id: '002',
        name: 'Scooby-Dooo',
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
        name: 'Scooby-Doooo',
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
        id: '004',
        name: 'Scooby-Dooooo',
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
        id: '005',
        name: 'Scooby-Doooooo',
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
        name: 'Scooby-Dooooooo',
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

}
