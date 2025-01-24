const tasks = [
  {
    id: 1,
    title: "Master the Art of Juggling",
    description: "Learn to juggle three flaming torches while riding a unicycle. Start with basic juggling techniques and gradually progress to advanced fire juggling skills.",
    timestamp: "Jan 23, 2025 10:18 AM",
    completed: true,
  },
  {
    id: 2,
    title: "Conquer Mount Everest",
    description: "Embark on an epic adventure to scale the tallest peak in the world. Prepare physically and mentally for extreme conditions, altitude sickness, and unpredictable weather.",
    timestamp: "Jan 20, 1970 2:02 PM",
    completed: false,
  },
  {
    id: 3,
    title: "Train a Dragon",
    description: "Become a dragon whisperer and train a majestic fire-breathing creature. Teach it tricks, agility, and even how to play fetch with sheep.Become a dragon whisperer and train a majestic fire-breathing creature. Teach it tricks, agility, and even how to play fetch with sheep.",
    timestamp: "Jan 20, 1970 2:02 PM",
    completed: false,
  },
  {
    id: 4,
    title: "Invent a Time Machine",
    description: "Dive into the realm of theoretical physics and create a time machine capable of traveling to any era in history. Be cautious of the space-time continuum!",
    timestamp: "Jan 20, 1970 2:02 PM",
    completed: false,
  },
  {
    id: 5,
    title: "Build a Treehouse on Mars",
    description: "Use your engineering skills to construct a habitable treehouse on the Red Planet. Design an airtight structure with self-sustaining systems for water, food, and oxygen.",
    timestamp: "Jan 20, 1970 2:02 PM",
    completed: false,
  },
  {
    id: 6,
    title: "Become a Ninja Warrior",
    description: "Train rigorously in various martial arts disciplines, acrobatics, and obstacle course challenges. Prepare for the ultimate test of agility, strength, and mental fortitude.",
    timestamp: "Jan 20, 1970 2:02 PM",
    completed: false,
  },
  {
    id: 7,
    title: "Discover Atlantis",
    description: "Embark on an underwater expedition to uncover the mythical city of Atlantis. Dive deep into the ocean depths, explore ancient ruins, and decipher mysterious symbols.",
    timestamp: "Jan 20, 1970 2:02 PM",
    completed: false,
  },
  {
    id: 8,
    title: "Win an Interplanetary Cooking Competition",
    description: "Showcase your culinary skills by participating in an interplanetary cooking competition. Create innovative dishes using extraterrestrial ingredients and out-of-this-world flavors.",
    timestamp: "Jan 20, 1970 2:02 PM",
    completed: false,
  },
  {
    id: 9,
    title: "Become a Professional Pirate",
    description: "Set sail on a pirate ship, learn to navigate the high seas, and engage in swashbuckling adventures. Master the art of sword fighting and plunder hidden treasures.",
    timestamp: "Jan 20, 1970 2:02 PM",
    completed: false,
  },
  {
    id: 10,
    title: "Solve the Riddle of the Sphinx",
    description: "Journey to the enigmatic Sphinx in Egypt and unravel its age-old riddle. Combine wit, logic, and historical knowledge to unlock the secrets of this ancient guardian.",
    timestamp: "Jan 20, 1970 2:02 PM",
    completed: false,
  },
];
let currentFilter = "all"; 
let taskToDeleteId = null; 
let taskToEditId = null;
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; 
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "all") return true;
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
  });
  filteredTasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.className = `task-card ${task.completed ? "completed" : ""}`;
    taskCard.innerHTML = `
      <div class="action-icons">
        <i class="bi bi-pencil" onclick="showEditTaskModal(${task.id})" style="cursor: pointer;"></i>
        <i class="bi bi-trash trash" onclick="confirmDelete(${task.id})" style="cursor: pointer;"></i>
        <div class="circular-slider ${task.completed ? "completed" : ""}" onclick="toggleTaskCompletion(${task.id})">
          <div class="slider-dot"></div>
        </div>
      </div>
      <img src="good-luck.gif" alt="Task Background" class="task-bg">
      <div class="content">
        <h5 class="task-title">${task.title}</h5>
        <hr class="new"/>
        <p class="task-desc">${task.description}</p>
        <small class="task-timestamp bi bi-clock ">${task.timestamp}</small>
      </div>
    `;
    taskList.appendChild(taskCard);
  });
}
function toggleTaskCompletion(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}
function showEditTaskModal(id) {
  taskToEditId = id; 
  const task = tasks.find((task) => task.id === taskToEditId);
  if (task) {
    document.getElementById('editTaskTitle').value = task.title;
    document.getElementById('editTaskDescription').value = task.description;
    const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    editTaskModal.show();
  }
}
function saveEditedTask() {
  const title = document.getElementById('editTaskTitle').value;
  const description = document.getElementById('editTaskDescription').value;
  if (title && description) {
    const task = tasks.find((task) => task.id === taskToEditId);
    if (task) {
      task.title = title;
      task.description = description;
      renderTasks();
      clearEditTaskModal();
    }
  } else {
    alert("Please fill in both fields.");
  }
}
function clearEditTaskModal() {
  document.getElementById('editTaskTitle').value = '';
  document.getElementById('editTaskDescription').value = '';
  const editTaskModal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
  editTaskModal.hide();
}
function confirmDelete(id) {
  taskToDeleteId = id; 
  const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  deleteModal.show();
}
function deleteTask() {
  const taskIndex = tasks.findIndex((task) => task.id === taskToDeleteId);
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
    renderTasks();
  }
  taskToDeleteId = null;
}
document.getElementById('confirmDelete').addEventListener('click', () => {
  deleteTask();
  const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
  deleteModal.hide();
});
document.getElementById('filter-all').addEventListener('click', () => {
  currentFilter = "all";
  renderTasks();
});
document.getElementById('filter-active').addEventListener('click', () => {
  currentFilter = "active";
  renderTasks();
});
document.getElementById('filter-completed').addEventListener('click', () => {
  currentFilter = "completed";
  renderTasks();
});
function showAddTaskModal() {
  const addTaskModal = new bootstrap.Modal(document.getElementById('addTaskModal'));
  addTaskModal.show();
}
function addTask() {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  if (title && description) {
    const newTask = {
      id: tasks.length + 1, 
      title: title,
      description: description,
      timestamp: new Date().toLocaleString(),
      completed: false,
    };
    tasks.push(newTask);
    renderTasks();
    clearAddTaskModal();
  } else {
    alert("Please fill in both fields.");
  }
}
function clearAddTaskModal() {
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDescription').value = '';
  const addTaskModal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
  addTaskModal.hide();
}
document.getElementById('addTaskButton').addEventListener('click', addTask);
document.querySelector('.btn-dark').addEventListener('click', showAddTaskModal);
document.getElementById('saveEditTaskButton').addEventListener('click', saveEditedTask);
renderTasks();