let comp = { FirstName: "bar" };

for (let key in comp) {
  console.log(key.replace("_", " "));
  console.log(comp[key]);
}
