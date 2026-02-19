// let div = document.getElementById("img- container");
// function showDataOnUI(data) {
//     //console.log(data);
//     let div1 = document.createElement("div");
//     let img = document.createElement("img");
//     img.src = data.download_url;
//     //div1.appendChild(img);
//     //div.appendChild(div1);
// async function fetchIamge(){
//     try{
//         let res = await fetch(`https://api.unplash.com/photos/random/?client_id=_j4MyInstunBQjejhCGQ6qDCTdcqmDXtbJQGd2PaBYdY&count=10`);
//         let data= await res.json();
//         let box = document.querySelector(".box");
//         data.forEach((photo)=>{
//             console.log(photo);
//             let img = document.createElement("img");
//             img.src = photo.urls.regular;
//             box.append(img);
//         })
//     }catch(err){
//         console.error("Error fetching images:", error);
//     }
// }
// }
// fetchIamge();
// window.addEventListener("scroll", function () {
//     if(Math.ceil(this.window.scrolly+this.window.innerHeight)>= this.document.body.offsetHeight){
//         fetchIamge();
//     }
// });
async function fetchImage(){
    try{
        // request multiple photos to support infinite scroll; Unsplash returns
        // either an object (single) or an array (when using `count`)
        let response = await fetch('https://api.unsplash.com/photos/random?client_id=dgmtL9mg4kYqOM1FH4Ore7PCMd6eWyCu0NXA0X6EPIs&count=10');
        let data = await response.json();
        let box = document.querySelector(".box");
        if (Array.isArray(data)) {
            data.forEach((photo) => {
                console.log(photo);
                let img = document.createElement("img");
                img.src = photo.urls.regular;
                box.append(img);
            });
        } else if (data && typeof data === 'object') {
            // handle single-photo response
            console.log(data);
            let img = document.createElement("img");
            img.src = data.urls.regular;
            box.append(img);
        }
        
       
    }catch(error){
        console.log("Error fetching image:",error);
    }

    
}
fetchImage();

window.addEventListener("scroll", function () {
    if (Math.ceil(window.scrollY + window.innerHeight) >= document.body.offsetHeight) {
        fetchImage();
    }
});