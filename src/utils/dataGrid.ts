export function gridFilter2query(filters, config = {}) {
  const finalFilter = {};
  filters.forEach((obj) => {
    let filter = '__icontains';
    if (obj.id in config) filter = config[obj.id];
    finalFilter[obj.id.replace('.', '__') + filter] = obj.value;
  });
  return finalFilter;
}

export function gridOrdering2query(orderings) {
  const finalOrdering = [];
  orderings.forEach((obj) => finalOrdering.push(obj.desc ? `-${obj.id}` : `+${obj.id}`));
  return { ordering: finalOrdering.join(',') };
}
