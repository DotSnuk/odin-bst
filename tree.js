import Node from './nodeFactory.js';
import mergeSort from './mergeSort.js';

export default class Tree {
  constructor(arr) {
    this.ogArray = Array.from(new Set(arr));
    this.root = null;
  }

  init() {
    this.sortArray();
    this.root = this.buildTree(this.ogArray);
  }

  sortArray() {
    this.ogArray = mergeSort(this.ogArray);
  }

  static getChildrenInt(node) {
    let childrenInt = 0;
    ['left', 'right'].forEach(direction => {
      if (node[direction] !== null) childrenInt += 1;
    });
    return childrenInt;
  }

  find(value, node = this.root) {
    if (node.data === value) return node;
    if (node.data < value) {
      if (node.right === null) return false;
      return this.find(value, node.right);
    }
    if (node.left === null) return false;
    return this.find(value, node.left);
  }

  static defaultCall(node) {
    console.log(`${node.data}`);
  }

  levelOrder(callback = Tree.defaultCall) {
    const queue = [this.root];
    while (queue.length > 0) {
      const tempNode = queue.shift();
      callback(tempNode);
      ['left', 'right'].forEach(direction => {
        if (tempNode[direction] !== null) queue.push(tempNode[direction]);
      });
    }
  }

  levelOrderRec(callback = Tree.defaultCall, queue = [this.root]) {
    if (queue.length === 0) return true;
    const temp = queue.shift();
    callback(temp);
    ['left', 'right'].forEach(direction => {
      if (temp[direction] !== null) queue.push(temp[direction]);
    });
    return this.levelOrderRec(callback, queue);
  }

  inOrder(callback = Tree.defaultCall, node = this.root, arr = []) {
    // left, root, right
    if (node.left !== null) return this.inOrder(callback, node.left, arr);
    arr.push(node.data);
    if (node.right !== null) return this.inOrder(callback, node.right, arr);
    return arr;
  }

  static deleteCondition(sourceNode, children) {
    let node = sourceNode;
    return {
      0: () => {
        node = null;
      },
      1: () => {
        ['left', 'right'].forEach(childDir => {
          if (node[childDir] !== null) node = node[childDir];
        });
      },
      2: () => {
        let intCompare = node.right;
        let parent = null;
        while (intCompare.left !== null) {
          parent = intCompare;
          intCompare = intCompare.left;
        }
        node.data = intCompare.data;
        if (parent !== null) {
          parent.left = intCompare.right;
        } else {
          node.right = intCompare.right;
        }
      },
    }[children]();
  }

  deleteItem(value, root = this.root) {
    if (root.data === value) {
      const children = Tree.getChildrenInt(root);
      return Tree.deleteCondition(root, children);
    } // need to check the first root
    const direction = value > root.data ? 'right' : 'left';
    if (root[direction] === null) return false;
    if (root[direction].data === value) {
      const children = Tree.getChildrenInt(root[direction]);
      return Tree.deleteCondition(root[direction], children);
    }
    return this.deleteItem(value, root[direction]);
  }

  insert(value, root = this.root) {
    if (value === root.data) return Tree.getChildrenInt(root);
    if (value < root.data && root.left === null) {
      const rootElmnt = root;
      rootElmnt.left = Node(value);
      return true;
    }
    if (value > root.data && root.right === null) {
      const rootElmnt = root;
      rootElmnt.right = Node(value);
      return true;
    }
    return value > root.data
      ? this.insert(value, root.right)
      : this.insert(value, root.left);
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

const bstTree = new Tree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 321, 322, 323, 324, 318, 319,
]);
bstTree.init();
// prettyPrint(bstTree.root);
bstTree.insert(6);
bstTree.insert(500);
// prettyPrint(bstTree.root);
// bstTree.deleteItem(23);
prettyPrint(bstTree.root);
console.log(bstTree.find(68));
console.log(bstTree.inOrder());
