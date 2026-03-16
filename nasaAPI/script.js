const url = "https://api.nasa.gov/planetary/apod?api_key=lVajc45dBrW8b0J1NeSUWltmOwqoXuxSK5ZCfHhj";

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    document.getElementById("title").innerText = data.title;
    document.getElementById("image").src = data.url;
    //document.getElementById("desc").innerText = data.explanation;
  })
  .catch(function(error) {
    console.log("Error:", error);
  });
