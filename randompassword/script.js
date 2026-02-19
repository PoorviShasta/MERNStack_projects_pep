let btnEl = document.querySelector('.btn');
let Input = document.getElementById("password");
btnEl.addEventListener('click', function(){
    createPassword();
})
function createPassword(){
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //let passwordLength = 9;
    let password = "";
    for(let i=0; i<10; i++){
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
    }
Input.value = password;
}
// First I selected the button using querySelector.
// Then added click event.
// Inside function, I stored all characters in a string.
// Then used Math.random to generate random index.
// Using substring I extracted one character.
// Loop runs 10 times to build password.
// Finally pass generated.
// First I created UI. Then selected elements using DOM.
// I attached click event to button.
// I stored all characters in a string.
// Using loop and Math.random, I generated random characters.
// Then I built password and displayed it in input field.