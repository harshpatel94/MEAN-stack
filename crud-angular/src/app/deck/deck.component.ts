import { Component, OnInit } from '@angular/core';
import { Deck } from '../deck';
import { DataService } from '../data.service';
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
  providers: [DataService]
})



export class DeckComponent implements OnInit {
  deck: Deck[]=[];
  deckList: Deck[]=[];
  isLoad: boolean;
  hearts: String[]=[];
  diamonds: String[]=[];
  spades: String[]=[];
  clubs: String[]=[];
  percentage: String;
  score: Number;
  average: String;

  constructor(private dataService: DataService,private router: ActivatedRoute) {
   }

   dealDecks(){
    this.isLoad = false;
    this.calculatePercenatge();
}

shuffleDecks = function () {
    for(var i = 1; i<=13; i++){
        this.riffleShuffleDecks();
    }
    this.spades = this.decks.slice(0, 13);
    this.clubs = this.decks.slice(13, 26);
    this.diamonds = this.decks.slice(26, 39);
    this.hearts = this.decks.slice(39, 52);
};

    decksValues = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    $build = function(cName, cSuits){
        for(var s = 0;s < cSuits.length;s++){
          for(var n=0;n<cName.length;n++){
            var value = cName[n] + ' of ' + cSuits[s];
            this.deck.push(value);
            switch(cSuits[s]){
              case 'Hearts':
                this.hearts.push(value);
                break;
              case 'Diamonds':
                this.diamonds.push(value);
                break;
              case 'Spades':
                this.spades.push(value);
                break;
              case 'Clubs':
                this.clubs.push(value);
                break;
            }
        }
      }
        return this.deck;
      };
  


    decks = this.$build(this.decksValues, [ 'Spades', 'Diamonds', 'Hearts', 'Clubs']);

        //for shuffling decks
        riffleShuffleDecks = function () {
            var decksLength = this.decks.length/2;
            var forwordDeck=this.decks.slice(0,decksLength);
            var backwordDeck=this.decks.slice(decksLength,this.decks.length);
            this.decks.length = 0;
            for (var i = 0; i < decksLength; i++) {
                this.decks.push(forwordDeck[i]);
                this.decks.push(backwordDeck[i]);
            }
        };


        // calcualte percentage
        calculatePercenatge = function () {
            let percentage = this.checkHorizonalValues(this.spades,
                'Spades', 0);
            percentage = this.checkHorizonalValues(this.diamonds,
                'Diamonds', percentage);
            percentage = this.checkHorizonalValues(this.hearts,
                'Hearts', percentage);
            percentage = this.checkHorizonalValues(this.clubs, 'Clubs',
                percentage);
            let score = percentage;
            this.score = score;
            percentage = (percentage * (100 / 104)).toFixed(2);
            this.percentage = percentage;
            let dealdecks: Deck = {
                config: this.decks,
                percentage: this.percentage,
                score: this.score
            };
            this.dataService.saveDeck(dealdecks)
            .subscribe(deck =>{
                alert("Deck Configuration and Scores(%) stored to database.");
            },
        error => {
            alert("Action can't be done.")
        })
        };

        checkHorizonalValues = function (deckSuits, cardSuits,
            percentage) {
            for (var i = 0; i < deckSuits.length; i++) {
                console.log(deckSuits[i].toString(), cardSuits);

                console.log(deckSuits[i].toString().indexOf(cardSuits));
                if (deckSuits[i].toString().indexOf(cardSuits) !== -1  ) {
                    console.log(deckSuits[i].toString().indexOf(this.decksValues[i].toString()));
                    if(deckSuits[i].toString().indexOf(this.decksValues[i].toString()) !== -1){
                        percentage++;
                    }
                }
            }
            return percentage;
        };

        getAllDecksHistory = function (){
            this.dataService.getAllDeck()
            .subscribe(dealdecks =>{
                  this.deckList = dealdecks;
                  let sum = 0;
                  for(var i = 0;i< this.deckList.length; i++){
                    sum = sum + Number(this.deckList[i].percentage);
                    this.deckList[i].config = this.deckList[i].config.split(',');
                    this.score = this.deckList[i].score;
                    }
                    console.log(sum);
                    let average = (sum/i).toFixed(2);
                    this.average = average.toString() + "%";
                })
        this.isLoad = true;
        }

ngOnInit(){
    
}  

}
