/**
 * Return the lowest coordinate from 2 points
 * @param {string} pos1
 * @param {string} pos2
 * @returns string
 */
export function MinCoord(pos1, pos2) {
  let ListPos1 = pos1.split(" ").map(Number);
  let ListPos2 = pos2.split(" ").map(Number);

  let PosX = [ListPos1[0], ListPos2[0]];
  let PosY = [ListPos1[1], ListPos2[1]];
  let PosZ = [ListPos1[2], ListPos2[2]];

  let x = Math.min(...PosX);
  let y = Math.min(...PosY);
  let z = Math.min(...PosZ);

  return `${x} ${y} ${z}`;
}

/**
 * Return how many blocks in that area
 * @param {string} pos1
 * @param {string} pos2
 * @returns number
 */
export function HowMuchBlocks(pos1, pos2) {
  let ListPos1 = pos1.split(" ").map(Number);
  let ListPos2 = pos2.split(" ").map(Number);

  let X = Math.abs(ListPos2[0] - ListPos1[0]) + 1;
  let Y = Math.abs(ListPos2[1] - ListPos1[1]) + 1;
  let Z = Math.abs(ListPos2[2] - ListPos1[2]) + 1;

  return X * Y * Z;
}
