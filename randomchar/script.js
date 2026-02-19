function getDog(){

  fetch("https://dog.ceo/api/breeds/image/random")

  .then(res => res.json())
  .then(data => {
    document.getElementById("dog").src = data.message
  })
  .catch(err=>{
    console.log("error",err)
  })
}

getDog()

