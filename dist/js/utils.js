function filterChildren(children) {
  return children.filter(function(c) {
    return c !== undefined && c !== null && typeof c !== 'boolean';
  });
}

function toArray(elem) {
  return Array.isArray(elem) ? elem : [elem];
}