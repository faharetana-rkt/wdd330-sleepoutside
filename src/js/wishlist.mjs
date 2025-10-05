// src/js/wishlist.mjs
const STORAGE_KEY = 'so-wishlist';

function readWishlist() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function writeWishlist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getWishlist() {
  return readWishlist();
}

export function isInWishlist(id) {
  const list = readWishlist();
  return list.includes(String(id));
}

export function addToWishlist(id) {
  const pid = String(id);
  const list = readWishlist();
  if (!list.includes(pid)) {
    list.push(pid);
    writeWishlist(list);
  }
  return list;
}

export function removeFromWishlist(id) {
  const pid = String(id);
  const list = readWishlist().filter(x => x !== pid);
  writeWishlist(list);
  return list;
}
