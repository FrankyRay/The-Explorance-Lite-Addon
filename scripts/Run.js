//@ts-check
let message = "<@s> has {@s|health} HP";
let score = /({\S+})|(<[@a-zA-Z0-9]+>)/g;

let output1 = message.split(score);
//   .filter((element) => {
//   return element != undefined;
// });

// let final = list.join(", ");
console.log(output1);
