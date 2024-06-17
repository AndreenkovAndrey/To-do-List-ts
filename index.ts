const form: Element = document.querySelector("#form")!;
const taskInput: HTMLInputElement  = document.querySelector("#container-form_input")!;
const taskList: Element = document.querySelector("#list")!;
const task : Element= document.querySelector(".container-list-tasks")!;
let currentId: number = 0;

form.addEventListener("submit", function (event): void {
  event.preventDefault();

  const taskText: string = taskInput.value!;
  const taskHTML: string = `<li class="container-list-tasks" id= "${currentId}">
  <input type="text" style="display: none"  id="${`input-${currentId}`}"></input>
  <div class="container-list_name" id="${`taskName-${currentId}`}">${taskText}</div>
  <div class="container-list_buttons">
  <button type="button"  id="${`save-${currentId}`}" class="container-list_buttons-action" style="display: none">
  Save
  </button>
  <button type="button" data-action="edit" id="${`edit-${currentId}`}" class="container-list_buttons-action">
  Edit
  </button>
  <button type="button" data-action="delete"  id="${`delete-${currentId}`}" class="container-list_buttons-action">
  Delete
  </button>
  </div>
  </li>`;
  
  taskList.insertAdjacentHTML("beforeend", taskHTML);
  taskInput.value = "";
  currentId++;
});

const taskListClickHandler = (event: Event): void => {
  const targetElement = event.target as HTMLElement;

  if (!targetElement || !targetElement.id) return;

  if (targetElement.id.includes("edit")) {
    editTask(event);
  }
  if (targetElement.id.includes("delete")) {
    deleteTask(event);
  }
  if (targetElement.id.includes("save")) {
    saveEdTask(event);
  }
};


taskList.addEventListener("click", taskListClickHandler);


const deleteTask = (event: Event) : void =>{
  const targetElement = event.target as Element;
  if (!targetElement) return;
  const listItem = targetElement.closest("li");
  if (listItem) {
    listItem.remove();
  }
}

const editTask = (event: Event) => {
  const targetElement = event.target as HTMLElement;
  if (!targetElement || !targetElement.id) return;

  const taskId: string | null = targetElement.id.slice(5);
  if(!taskId) return
  const taskParent: HTMLElement | null = document.getElementById(`${taskId}`);
  if(!taskParent) return
  const taskElement: Element | null = taskParent.querySelector(".container-list_name");
  if(!taskElement) return
  const taskName: string | null = taskElement.textContent
  if(!taskName) return
  const taskParentInput: HTMLInputElement | null = taskParent.querySelector("input");
  if(!taskParentInput) return;
  taskParentInput.value = taskName ;

  toggleElementVisibility(`taskName-${taskId}`, false);
  toggleElementVisibility(`input-${taskId}`, true);
  toggleElementVisibility(`edit-${taskId}`, false);
  toggleElementVisibility(`save-${taskId}`, true);
};

const saveEdTask = (event: Event): void => {
  const targetElement = event.target as HTMLElement;
  if (!targetElement || !targetElement.id) return;

  const taskId: string = targetElement.id.slice(5);
  const taskParent: HTMLElement | null = document.getElementById(`${taskId}`);
  if(!taskParent) return
  const taskParentInput: HTMLInputElement | null = taskParent.querySelector("input");
  if(!taskParentInput) return
  const taskName: string | null = taskParentInput.value;
  if(!taskName) return
  const taskElement = taskParent.querySelector(".container-list_name");
  if(!taskElement) return
  taskElement.textContent = taskName;
  taskParentInput.value = "";

  toggleElementVisibility(`taskName-${taskId}`, true);
  toggleElementVisibility(`input-${taskId}`, false);
  toggleElementVisibility(`edit-${taskId}`, true);
  toggleElementVisibility(`save-${taskId}`, false);
};

const toggleElementVisibility = (id: string, show: boolean) => {
  const currentElement : HTMLElement | null = document.getElementById(id);
  if(!currentElement) return
  if (show) {
    currentElement.style.display = "";
  } else {
    currentElement.style.display = "none";
  }
};
