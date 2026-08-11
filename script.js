const form = document.getElementById("studentForm");

const message = document.getElementById("message");

const studentTable = document.getElementById("studentTable");


// Submit form
form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const student = {

        name: document.getElementById("name").value,

        roll: document.getElementById("roll").value,

        email: document.getElementById("email").value,

        course: document.getElementById("course").value
    };


    try {

        const response = await fetch("/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        });


        const result = await response.json();


        if (result.success) {

            message.textContent =
                "Student registered successfully!";

            message.style.color = "green";

            form.reset();

            loadStudents();

        } else {

            message.textContent = result.message;

            message.style.color = "red";
        }


    } catch (error) {

        message.textContent =
            "Server error. Please try again.";

        message.style.color = "red";

        console.error(error);
    }

});


// Load students
async function loadStudents() {

    try {

        const response = await fetch("/students");

        const students = await response.json();

        studentTable.innerHTML = "";


        students.forEach(student => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
            `;

            studentTable.appendChild(row);

        });


    } catch (error) {

        console.error("Unable to load students:", error);

    }
}


loadStudents();
