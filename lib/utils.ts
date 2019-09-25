export const deleteUndefined: (obj: object) => void = (obj) => {
  Object.keys(obj).forEach(val => obj[val] === undefined && delete obj[val]);
}
