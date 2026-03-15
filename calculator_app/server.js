const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

console.log("HELLO I AM RUNNING");

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get("/add", (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({
            status: "error",
            message: "Invalid input. Please provide valid numbers."
        });
    }

    res.json({
        status: "success",
        operation: "Addition",
        result: a + b
    });
});

app.get("/subtract", (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({
            status: "error",
            message: "Invalid input. Please provide valid numbers."
        });
    }

    res.json({
        status: "success",
        operation: "Subtraction",
        result: a - b
    });
});

app.get("/multiply", (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({
            status: "error",
            message: "Invalid input. Please provide valid numbers."
        });
    }

    res.json({
        status: "success",
        operation: "Multiplication",
        result: a * b
    });
});

app.get("/divide", (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({
            status: "error",
            message: "Invalid input. Please provide valid numbers."
        });
    }

    if (b === 0) {
        return res.status(400).json({
            status: "error",
            message: "Division by zero is not allowed."
        });
    }

    res.json({
        status: "success",
        operation: "Division",
        result: a / b
    });
});
app.get("/random", (req, res) => {

    let num = Math.floor(Math.random() * 100);

    res.send("Your random number is: " + num);

});

app.get("/", (req, res) => {
    res.send(`
        <h1>Calculator API is working</h1>
        <p>Try these URLs:</p>
        <ul>
            <li><a href="http://localhost:3000/add?a=10&b=5">Addition</a></li>
            <li><a href="http://localhost:3000/subtract?a=10&b=5">Subtraction</a></li>
            <li><a href="http://localhost:3000/multiply?a=10&b=5">Multiplication</a></li>
            <li><a href="http://localhost:3000/divide?a=10&b=5">Division</a></li>
            <li><a href="http://localhost:3000/random">Random Number</a></li>
        </ul>
    `);
});

 app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
 });
