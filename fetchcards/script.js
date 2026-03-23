// let deckId = ' ';
var deckId;
fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
.then(function(res){
  return res.json();
})
.then(function(data){
  deckId = data.deck_id;
});
function getCards(){
fetch("https://deckofcardsapi.com/api/deck/"+deckId+"/draw/?count=2")
.then(function(res){
  return res.json();
})
.then(function(data){
  document.getElementById("card1").src = data.cards[0].image;
  document.getElementById("card2").src = data.cards[1].image;
});

}
