function merge(left, right) {
  const merged = [];
  let lIndx = 0;
  let rIndx = 0;
  while (lIndx < left.length && rIndx < right.length) {
    if (left[lIndx] < right[rIndx]) {
      merged.push(left[lIndx]);
      lIndx += 1;
    } else {
      merged.push(right[rIndx]);
      rIndx += 1;
    }
  }
  while (lIndx < left.length) {
    merged.push(left[lIndx]);
    lIndx += 1;
  }
  while (rIndx < right.length) {
    merged.push(right[rIndx]);
    rIndx += 1;
  }
  // console.log(`merged ${merged}`);
  return merged;
}

export default function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }
  const [...arrHalfLeft] = array.slice(0, array.length / 2);
  const [...arrHalfRight] = array.slice(array.length / 2);
  return merge(mergeSort(arrHalfLeft), mergeSort(arrHalfRight));
}
