document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("classeForm");
  const tableBody = document.getElementById("classesTableBody");

  let classes = getData(STORAGE_KEYS.classes);
  let editId = null;

  function renderClasses(list = classes) {
    tableBody.innerHTML = "";

    list.forEach(classe => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${classe.nom}</td>
        <td>${classe.niveau}</td>
        <td>${classe.effectif || "-"}</td>
        <td>
          <button class="edit-btn" data-id="${classe.id}">Modifier</button>
          <button class="delete-btn" data-id="${classe.id}">Supprimer</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const nom = document.getElementById("classeNom").value.trim();
    const niveau = document.getElementById("classeNiveau").value.trim();
    const effectif = document.getElementById("classeEffectif").value.trim();

    if (!nom || !niveau) return alert("Le nom et le niveau sont obligatoires.");

    if (editId) {
      classes = classes.map(c => c.id === editId ? { ...c, nom, niveau, effectif } : c);
      editId = null;
    } else {
      classes.push({
        id: getNextId(classes),
        nom,
        niveau,
        effectif
      });
    }

    saveData(STORAGE_KEYS.classes, classes);
    form.reset();
    renderClasses();
  });

  tableBody.addEventListener("click", e => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains("delete-btn")) {
      classes = classes.filter(c => c.id !== id);
      saveData(STORAGE_KEYS.classes, classes);
      renderClasses();
    }

    if (e.target.classList.contains("edit-btn")) {
      const classe = classes.find(c => c.id === id);
      document.getElementById("classeNom").value = classe.nom;
      document.getElementById("classeNiveau").value = classe.niveau;
      document.getElementById("classeEffectif").value = classe.effectif || "";
      editId = id;
    }
  });

  renderClasses();
});
