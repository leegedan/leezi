function pick(obj, fields) {
  // eslint-disable-next-line prefer-object-spread
  const shallowCopy = {};
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i];
    shallowCopy[key] = obj[key];
  }
  return shallowCopy;
}
export default pick;
