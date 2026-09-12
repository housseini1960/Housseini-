const STORAGE_KEYS = {
  matieres: "gs_matieres",
  enseignants: "gs_enseignants",
  classes: "gs_classes"
};

function getData(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getNextId(items) {
  return items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;
}
