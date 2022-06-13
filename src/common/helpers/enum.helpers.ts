export const TransformEnums = <T, G>(to: T, from: G, value: any) => {
  if (Array.isArray(value)) {
    const transformedArray = [];
    for (const v of value) {
      transformedArray.push(to[from[v]]);
    }

    return transformedArray;
  }

  return to[from[value]];
};
