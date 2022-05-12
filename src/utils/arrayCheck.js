export const checkArray = (arr) => {
    console.log(typeof arr);
    if (typeof arr == "object") {
      return [];
    } else {
      return arr;
    }
  };