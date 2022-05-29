//@ts-check

let data = {
  theString: "This is string",
  theInteger: 1,
  theBoolean: true,
  theFunction: function Block() {},
  theUndefined: undefined,
  theArray: {
    something: true,
    love: 99.99,
  },
  theList: ["never", "gonna", "give", "you", "up"],
};
let output = "{";

Object.keys(data).forEach((key) => {
  if (Array.isArray(data[key])) {
    output += `\n  ${key} (array): [\n    ${data[key]}\n  ]`;
    return;
  }
  output += `\n  ${key} (${typeof data[key]}): ${data[key]}`;
});

output += "\n}";
console.log(output);

// let data = {
//   theArray: {
//     something: true,
//     love: 99.99,
//   },
//   theList: ["never", "gonna", "give", "you", "up"],
// };

// Object.keys(data).forEach((key) => {
//   if (typeof data[key] == "object" && !Array.isArray(data[key])) {
//     console.log(`Array found on data.${key}`);
//   }
// });
