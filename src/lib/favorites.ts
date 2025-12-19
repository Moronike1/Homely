
const KEY = "homely_favorites";

export function getFavorites(): string[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function toggleFavorite(id: string): string[] {
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem(KEY, JSON.stringify(favorites));
  return favorites;
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}
