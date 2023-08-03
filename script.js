const nodeFactory = (value, next = null) => ({ value, next });

const linkedList = () => {
  // Create head node
  const headNode = nodeFactory("head");
  // Track tail node
  let currentNode = headNode;

  function append(value) {
    // Append new node
    const node = nodeFactory(value);
    currentNode.next = node;
    currentNode = node;
  }

  function prepend(value) {
    // Prepend new node
    const firstNode = headNode.next;
    const node = nodeFactory(value, firstNode);
    headNode.next = node;
  }

  function returnListSize(node, count = 0) {
    // Return list size
    if (node === undefined) node = headNode;

    if (node.next == null) return count;

    if (node.next) count += 1;

    return count + returnListSize(node.next);
  }

  function returnHead() {
    // Return head node
    return headNode.next;
  }

  function returnTail() {
    // Return tail node
    return currentNode;
  }

  function returnAtIndex(index, node, count = 0) {
    // Return node at index in list
    if (node === undefined) node = headNode.next;

    if (count === index) return node;

    if (node.next) count += 1;

    return returnAtIndex(index, node.next, count);
  }

  function popNode() {
    // Pop node from list
    const listSize = returnListSize();
    const nodePrev = returnAtIndex(listSize - 2);
    nodePrev.next = null;
    currentNode = nodePrev;
  }

  function contains(value, node) {
    // Check if node contains value
    if (node === undefined) node = headNode.next;

    if (node === null) return false;

    if (node.value === value) return true;

    return contains(value, node.next);
  }

  function find(value, node, index = 0) {
    // Return index of node with value
    if (node === undefined) node = headNode.next;

    if (node === null) return "Doesn't exist";

    if (node.value === value) return index;
    return find(value, node.next, index + 1);
  }

  function toString(node, list = "") {
    // Returns list as a string
    if (node === undefined) node = headNode.next;
    if (node === null) {
      const output = list.concat("null");
      return output;
    }
    const text = `( ${node.value.toString()} ) -> `;
    const output = list.concat(text);

    return toString(node.next, output);
  }

  function insertAt(value, index) {
    // Insert value at index, if index = 0 then prepend
    if (index === 0) {
      prepend(value);
      return;
    }

    // If index is greater than list size then append
    const listSize = returnListSize();
    if (index >= listSize) {
      append(value);
      return;
    }

    const prevNode = returnAtIndex(index - 1);
    const prevNodeNext = prevNode.next;

    const node = nodeFactory(value, prevNodeNext);
    prevNode.next = node;
  }

  function removeAt(index) {
    // Removes node at index
    const listSize = returnListSize();
    if (index > listSize) {
      return "Invalid index";
    }

    if (index === listSize) {
      popNode();
      return;
    }

    const targetNode = returnAtIndex(index);
    const prevNode = returnAtIndex(index - 1);

    prevNode.next = targetNode.next;
  }

  return {
    append,
    prepend,
    returnListSize,
    returnHead,
    returnTail,
    returnAtIndex,
    popNode,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
};
