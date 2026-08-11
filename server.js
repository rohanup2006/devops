const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, "students.json");

app.use(express.json());
app.use(express.static(__dirname));

// Register student
app.post("/register", (req, res) => {

    const { name, roll, email, course } = req.body;

    if (!name || !roll || !email || !course) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    let students = [];

    try {
        const data = fs.readFileSync(DATA_FILE, "utf8");

        if (data.trim()) {
            students = JSON.parse(data);
        }
    } catch (error) {
        students = [];
    }

    const newStudent = {
        id: students.length + 1,
        name: name,
        roll: roll,
        email: email,
        course: course
    };

    students.push(newStudent);

    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(students, null, 2)
    );

    res.json({
        success: true,
        message: "Student registered successfully",
        student: newStudent
    });
});

// Get all students
app.get("/students", (req, res) => {

    try {
        const data = fs.readFileSync(DATA_FILE, "utf8");

        const students = data.trim()
            ? JSON.parse(data)
            : [];

        res.json(students);

    } catch (error) {
        res.status(500).json({
            message: "Unable to read students.json"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
