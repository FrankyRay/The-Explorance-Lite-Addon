let creatureList = [
  ["Animals", "others"],
  ["Anomalocaris", "invertebrates"],
  ["Apatosaurus", "dinosaurs"],
  ["Baryonyx", "dinosaurs"],
  ["Coelacanth", "fishes"],
  ["Dimetrodon", "mammals"],
  ["Direwolf", "mammals"],
  ["Dodo", "birds"],
  ["Humans", "others"],
  ["Megaloceros", "mammals"],
  ["Megapiranha", "fishes"],
  ["Parasaurolophus", "dinosaurs"],
  ["Sarcosuchus", "reptiles"],
  ["Saurophaganax", "dinosaurs"],
  ["Stegosaurus", "dinosaurs"],
  ["Triceratops", "dinosaurs"],
  ["Tyrannosaurus", "dinosaurs"],
  ["Utahraptor", "dinosaurs"],
];

let newArray = creatureList.filter((creature) => creature[1] === "dinosaurs");
console.log(newArray);
