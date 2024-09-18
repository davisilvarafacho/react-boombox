interface SimpleObject {
  [key: string]: SimpleObject | any;
}

export function dynamicPropGetter<T extends SimpleObject>(obj: T, path: string) {
  if (!path) return obj;
  const properties = path.split('.');
  return dynamicPropGetter(obj[properties.shift() as T[keyof T]], properties.join('.'));
}
