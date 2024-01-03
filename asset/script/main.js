// Déclaration de la variable tasks pour stocker les tâches
let tasks = [];

// Fonction pour sauvegarder les tâches dans le local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Stocke les tâches sous forme de chaîne JSON
}

// Fonction pour charger les tâches depuis le local storage
function loadTasks() {
  const tasksFromStorage = localStorage.getItem('tasks'); // Récupère les tâches depuis le local storage
  if (tasksFromStorage) {
    tasks = JSON.parse(tasksFromStorage); // Convertit les tâches en objet depuis la chaîne JSON
    renderTasks(); // Affiche les tâches chargées
  }
}

// Fonction pour afficher les tâches dans le DOM
function renderTasks() {
  const taskList = document.getElementById('taskList'); // Récupère la liste de tâches dans le DOM
  taskList.innerHTML = ''; // Efface la liste actuelle

  // Crée les éléments HTML pour chaque tâche et les ajoute à la liste
  tasks.forEach((task, index) => {
    const newTask = document.createElement('li'); // Crée un élément li pour la tâche
    newTask.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
      <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(newTask); // Ajoute la tâche à la liste
  });

  saveTasks(); // Sauvegarde les tâches dans le local storage après chaque modification
}

// Fonction pour ajouter une nouvelle tâche
function addTask() {
  const taskInput = document.getElementById('taskInput'); // Récupère la valeur de l'input
  if (taskInput.value !== '') {
    const newTask = {
      name: taskInput.value,
      completed: false
    };
    tasks.push(newTask); // Ajoute la nouvelle tâche au tableau
    renderTasks(); // Affiche les tâches mises à jour
    taskInput.value = ''; // Réinitialise l'input
  } else {
    alert('Please enter a task!'); // Alerte si aucun texte n'est entré
  }
}

// Fonction pour basculer l'état d'une tâche (complétée/non complétée)
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed; // Inverse l'état de la tâche
  renderTasks(); // Affiche les tâches mises à jour
}

// Fonction pour supprimer une tâche
function deleteTask(index) {
  tasks.splice(index, 1); // Supprime la tâche du tableau
  renderTasks(); // Affiche les tâches mises à jour
}

// Fonction pour filtrer les tâches selon leur état (complétées ou non complétées)
function filterTasks(completed) {
    const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => task.completed === completed);
  filteredTasks.forEach((task, index) => {
    const newTask = document.createElement('li');
    newTask.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
      <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(newTask);
  });
}

// Fonction pour supprimer toutes les tâches
function deleteAllTasks() {
  tasks = []; // Réinitialise le tableau des tâches (supprime tout)
  renderTasks(); // Affiche une liste vide
}

// Fonction pour afficher toutes les tâches
function showAllTasks() {
  renderTasks(); // Affiche toutes les tâches (enlève tout filtre)
}

// Charger les tâches depuis le local storage au chargement de la page
loadTasks(); // Appelle la fonction de chargement des tâches au chargement de la page

