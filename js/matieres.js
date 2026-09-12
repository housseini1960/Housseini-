document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("matiereForm");
  const tableBody = document.getElementById("matieresTableBody");
  const searchInput = document.getElementById("searchMatiere");

  let matieres = getData(STORAGE_KEYS.matieres);
  let editId = null;

  function renderMatieres(list = matieres) {
    tableBody.innerHTML = "";

    list.forEach(matiere => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${matiere.nom}</td>
        <td>${matiere.code || "-"}</td>
        <td>
          <button class="edit-btn" data-id="${matiere.id}">Modifier</button>
          <button class="delete-btn" data-id="${matiere.id}">Supprimer</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    updateDashboard();
  }

  function fillMatiereSelect() {
    const select = document.getElementById("enseignantMatiere");
    if (!select) return;
    select.innerHTML = `<option value="">Choisir une matière</option>`;
    matieres.forEach(m => {
      select.innerHTML += `<option value="${m.id}">${m.nom}</option>`;
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const nom = document.getElementById("matiereNom").value.trim();
    const code = document.getElementById("matiereCode").value.trim();

    if (!nom) return alert("Le nom de la matière est obligatoire.");

    if (editId) {
      matieres = matieres.map(m => m.id === editId ? { ...m, nom, code } : m);
      editId = null;
    } else {
      matieres.push({
        id: getNextId(matieres),
        nom,
        code
      });
    }

    saveData(STORAGE_KEYS.matieres, matieres);
    form.reset();
    renderMatieres();
    fillMatiereSelect();
  });

  tableBody.addEventListener("click", e => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains("delete-btn")) {
      matieres = matieres.filter(m => m.id !== id);
      saveData(STORAGE_KEYS.matieres, matieres);
      renderMatieres();
      fillMatiereSelect();
    }

    if (e.target.classList.contains("edit-btn")) {
      const matiere = matieres.find(m => m.id === id);
      document.getElementById("matiereNom").value = matiere.nom;
      document.getElementById("matiereCode").value = matiere.code || "";
      editId = id;
    }
  });

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = matieres.filter(m => m.nom.toLowerCase().includes(value));
    renderMatieres(filtered);
  });

  window.fillMatiereSelect = fillMatiereSelect;
  renderMatieres();
  fillMatiereSelect();
});
