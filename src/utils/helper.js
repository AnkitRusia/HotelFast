export const formatter = (data) => {
  const ret = {};
  Object.keys(data).forEach((key) => {
    if (data[key].length > 0) ret[key] = data[key];
  });
  return ret;
};
