const KEY = "homely_favorites";

export function getFavorites(): string[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function toggleFavorite(propertyId: string): string[] {
  let favorites = getFavorites();

  if (favorites.includes(propertyId)) {
    favorites = favorites.filter(id => id !== propertyId);
  } else {
    favorites.push(propertyId);
  }

  localStorage.setItem(KEY, JSON.stringify(favorites));
  return favorites;
}

export function clearFavorites() {
  localStorage.removeItem(KEY);
}
