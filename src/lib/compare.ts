const KEY = "homely_compare";
const MAX = 3;

export function getCompareList(): string[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function toggleCompare(id: string): string[] {
  let list = getCompareList();

  if (list.includes(id)) {
    list = list.filter(x => x !== id);
  } else {
    if (list.length >= MAX) return list;
    list.push(id);
  }

  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}

export function clearCompare() {
  localStorage.removeItem(KEY);
}
