const fs = require("fs");

console.log("================================");
console.log(" Jenkins Student Data Test");
console.log("================================");

let passed = true;


// Test 1: Check students.json
console.log("\nTest 1: Checking students.json...");

if (fs.existsSync("students.json")) {

    console.log("PASS: students.json exists");

} else {

    console.log("FAIL: students.json does not exist");

    passed = false;
}


// Test 2: Check JSON format
console.log("\nTest 2: Checking JSON format...");

let students = [];

try {

    const data = fs.readFileSync(
        "students.json",
        "utf8"
    );

    students = JSON.parse(data);

    console.log("PASS: Valid JSON");

} catch (error) {

    console.log("FAIL: Invalid JSON");

    passed = false;
}


// Test 3: Check array
console.log("\nTest 3: Checking student data structure...");

if (Array.isArray(students)) {

    console.log("PASS: Student data is an array");

} else {

    console.log("FAIL: Student data is not an array");

    passed = false;
}


// Test 4: Validate students
console.log("\nTest 4: Validating student records...");

students.forEach((student, index) => {

    if (
        student.name &&
        student.roll &&
        student.email &&
        student.course
    ) {

        console.log(
            `PASS: Student ${index + 1} is valid`
        );

    } else {

        console.log(
            `FAIL: Student ${index + 1} is invalid`
        );

        passed = false;
    }

});


// Final result
console.log("\n================================");

if (passed) {

    console.log("ALL TESTS PASSED");

    process.exit(0);

} else {

    console.log("TESTS FAILED");

    process.exit(1);
}
