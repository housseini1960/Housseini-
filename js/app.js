function updateDashboard() {
  const matieres = getData(STORAGE_KEYS.matieres);
  const enseignants = getData(STORAGE_KEYS.enseignants);
  const classes = getData(STORAGE_KEYS.classes);

  const countMatieres = document.getElementById("countMatieres");
  const countEnseignants = document.getElementById("countEnseignants");
  const countClasses = document.getElementById("countClasses");

  if (countMatieres) countMatieres.textContent = matieres.length;
  if (countEnseignants) countEnseignants.textContent = enseignants.length;
  if (countClasses) countClasses.textContent = classes.length;
}

document.addEventListener("DOMContentLoaded", updateDashboard);
