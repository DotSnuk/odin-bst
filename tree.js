import Node from './nodeFactory.js';
import mergeSort from './mergeSort.js';

export default class Tree {
  constructor(arr) {
    this.ogArray = Array.from(new Set(arr));
    this.sortArray();
    this.levelZero = this.buildTree(this.ogArray);
  }

  sortArray() {
    this.ogArray = mergeSort(this.ogArray);
  }

  buildTree(arr) {
    if (arr.length < 1) return null;
    const mid = Math.floor((arr.length - 1) / 2);
    const root = Node(arr[mid]);
    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1, arr.length));
    return root;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const sda = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(sda.levelZero);
