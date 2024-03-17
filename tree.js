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

  static deleteCondition(rootNode, children, direction = null) {
    const node = rootNode;
    return {
      0: () => {
        node[direction] = null;
      },
      1: () => {
        ['left', 'right'].forEach(childDir => {
          if (node[direction][childDir] !== null)
            node[direction] = node[direction][childDir];
        });
      },
      2: () => {
        // const integerToBeDeleted = node[direction].data; // find the next highest value to replace that
        let intCompare = node[direction].right;
        while (intCompare.left !== null) intCompare = intCompare.left;
        console.log(intCompare);
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
      return Tree.deleteCondition(root, children, direction);
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

const bstTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
bstTree.init();
// prettyPrint(bstTree.root);
bstTree.insert(6);
bstTree.insert(500);
prettyPrint(bstTree.root);
bstTree.deleteItem(6);
prettyPrint(bstTree.root);
