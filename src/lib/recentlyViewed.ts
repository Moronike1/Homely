const KEY = "homely_recently_viewed";
const MAX = 6;

export function getRecentlyViewed(): string[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function addRecentlyViewed(propertyId: string) {
  let list = getRecentlyViewed();

  list = list.filter(id => id !== propertyId);
  list.unshift(propertyId);

  if (list.length > MAX) {
    list = list.slice(0, MAX);
  }

  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("recently-viewed-updated"));
}


