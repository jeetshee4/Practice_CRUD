const nameInput =document.getElementById('name');

const deptInput =document.getElementById('dept');

const rollInput = document.getElementById('roll');

const submitButton = document.querySelector("button");

//nameInput , deptInput , rollInput these are html components


//function to add a new student into the localStorage
function addStudent() {
const Name = nameInput.value.trim();
const dept = deptInput.value.trim();
const roll = rollInput.value.trim();

if (Name == "" || dept == "" || roll == "") {
 alert("Please fill all the fields");
 return;
}

const students = JSON.parse(localStorage.getItem("students")) || [];

students.push({Name ,dept ,roll});

localStorage.setItem('students' ,JSON.stringify(students));

//Then we will again clear the input fields
nameInput.value = "";
deptInput.value = "";
rollInput.value = "";

loadStudents();
};

//function to load and display all the students
function loadStudents() {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const contentDiv = document.querySelector(".content");
  
    // Remove old table if it exists
    const oldTable = document.querySelector(".students-table");
    if (oldTable) oldTable.remove();
  
    // Create a new table to display students
    const table = document.createElement("table");
    table.className = "students-table w-full border-collapse border border-gray-400";
    table.innerHTML = `
      <thead>
        <tr class="bg-gray-200 text-black">
          <th class="border border-gray-400 p-2">Name</th>
          <th class="border border-gray-400 p-2">Department</th>
          <th class="border border-gray-400 p-2">Roll</th>
          <th class="border border-gray-400 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${students.map((student, index) => `
          <tr>
            <td class="border border-gray-400 p-2">${student.Name}</td>
            <td class="border border-gray-400 p-2">${student.dept}</td>
            <td class="border border-gray-400 p-2">${student.roll}</td>
            <td class="border border-gray-400 p-2">
              <button class="edit-btn bg-blue-500 text-black px-2 py-1 rounded-md" data-index="${index}">Edit</button>
              <button class="delete-btn bg-red-500 text-black px-2 py-1 rounded-md" data-index="${index}">Delete</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    `;
  
    contentDiv.appendChild(table);
  
    // Add event listeners for edit and delete buttons
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", editStudent);
    });
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", deleteStudent);
    });
  }


// Function to edit a student
function editStudent(event) {
    const index = event.target.dataset.index;
    const students = JSON.parse(localStorage.getItem("students"));
  
    const student = students[index];
    nameInput.value = student.Name;
    deptInput.value = student.dept;
    rollInput.value = student.roll;
  
    // Remove the student from the list and save
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
  }
  
  // Function to delete a student
  function deleteStudent(event) {
    const index = event.target.dataset.index;
    const students = JSON.parse(localStorage.getItem("students"));
  
    // Remove the student from the list and save
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
  }
  
  // Attach event listener to the submit button
  submitButton.addEventListener("click", addStudent);
  
  // Load students on page load
  document.addEventListener("DOMContentLoaded", loadStudents);