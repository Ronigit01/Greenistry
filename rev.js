// let str = "roni";

// function reverse(str) {
//   let reversed = "";
//   for (let i = str.length - 1; i >= 0; i--) {
//     reversed += str[i];
//   }
//   console.log(reversed);
// }

// reverse(str);


let str = "i am roni";

function reverse(str) {
  let newstr = str.split(" ").reverse().join(" ")
  console.log(newstr)
}

reverse(str);
