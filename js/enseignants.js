document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enseignantForm");
  const tableBody = document.getElementById("enseignantsTableBody");

  let enseignants = getData(STORAGE_KEYS.enseignants);
  let matieres = getData(STORAGE_KEYS.matieres);
  let editId = null;

  function fillMatiereSelect() {
    const select = document.getElementById("enseignantMatiere");
    select.innerHTML = `<option value="">Choisir une matière</option>`;
    matieres.forEach(m => {
      select.innerHTML += `<option value="${m.id}">${m.nom}</option>`;
    });
  }

  function renderEnseignants(list = enseignants) {
    tableBody.innerHTML = "";

    list.forEach(enseignant => {
      const matiere = matieres.find(m => m.id === Number(enseignant.matiereId));
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${enseignant.nom}</td>
        <td>${enseignant.prenom}</td>
        <td>${enseignant.email}</td>
        <td>${enseignant.telephone}</td>
        <td>${matiere ? matiere.nom : "-"}</td>
        <td>
          <button class="edit-btn" data-id="${enseignant.id}">Modifier</button>
          <button class="delete-btn" data-id="${enseignant.id}">Supprimer</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const nom = document.getElementById("enseignantNom").value.trim();
    const prenom = document.getElementById("enseignantPrenom").value.trim();
    const email = document.getElementById("enseignantEmail").value.trim();
    const telephone = document.getElementById("enseignantTelephone").value.trim();
    const matiereId = document.getElementById("enseignantMatiere").value;

    if (!nom || !prenom || !email || !telephone || !matiereId) {
      return alert("Tous les champs sont obligatoires.");
    }

    if (editId) {
      enseignants = enseignants.map(e => e.id === editId ? { ...e, nom, prenom, email, telephone, matiereId } : e);
      editId = null;
    } else {
      enseignants.push({
        id: getNextId(enseignants),
        nom,
        prenom,
        email,
        telephone,
        matiereId
      });
    }

    saveData(STORAGE_KEYS.enseignants, enseignants);
    form.reset();
    renderEnseignants();
  });

  tableBody.addEventListener("click", e => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains("delete-btn")) {
      enseignants = enseignants.filter(e => e.id !== id);
      saveData(STORAGE_KEYS.enseignants, enseignants);
      renderEnseignants();
    }

    if (e.target.classList.contains("edit-btn")) {
      const enseignant = enseignants.find(e => e.id === id);
      document.getElementById("enseignantNom").value = enseignant.nom;
      document.getElementById("enseignantPrenom").value = enseignant.prenom;
      document.getElementById("enseignantEmail").value = enseignant.email;
      document.getElementById("enseignantTelephone").value = enseignant.telephone;
      document.getElementById("enseignantMatiere").value = enseignant.matiereId;
      editId = id;
    }
  });

  fillMatiereSelect();
  renderEnseignants();
});
