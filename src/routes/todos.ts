import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const dbPath = path.join(__dirname, "../db/todos.json");

function readDB() {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
}

function writeDB(data: any) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

router.get("/", (req, res) => {
    const todos = readDB();
    res.json(todos);
});

router.post("/", (req, res) => {
    const todos = readDB();
    const newTodo = { id: Date.now(), ...req.body };
    todos.push(newTodo);
    writeDB(todos);
    res.status(201).json(newTodo);
});

router.put("/:id", (req, res) => {
    const todos = readDB();
    const index = todos.findIndex((t: any) => t.id === +req.params.id);
    if (index === -1) return res.sendStatus(404);
    todos[index] = { ...todos[index], ...req.body };
    writeDB(todos);
    res.json(todos[index]);
});

router.delete("/:id", (req, res) => {
    const todos = readDB();
    const filtered = todos.filter((t: any) => t.id !== +req.params.id);
    writeDB(filtered);
    res.sendStatus(204);
});

router.post("/reorder", (req, res) => {
    const { test, ids } = req.body; // массив ID в новом порядке

    if (!Array.isArray(ids)) return res.status(400).send("Invalid format");

    const todos = readDB();
    const todosById = Object.fromEntries(todos.map((t: any) => [t.id, t]));

    const reordered = ids.map((id: number) => todosById[id]).filter(Boolean);

    if (reordered.length !== todos.length) {
        return res.status(400).send("Reorder list doesn't match todos");
    }

    writeDB(reordered);
    res.json(reordered);
});

export default router;
