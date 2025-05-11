import { Router } from "express";

import { db } from "../db/db";
import { todos } from "../db/schema";
import { eq, asc, desc, gt, lt, and } from "drizzle-orm";

const STEP = 500; // Шаг для перемещения задач
const router = Router();

router.get("/", async (_, res) => {
    // Старый способ (пока работает)
    //const result = await db.select().from(todos).orderBy(todos.id);

    // Новый способ (рекомендуется)
    const result = await db.query.todos.findMany({
        orderBy: (todos, { desc }) => [desc(todos.position), desc(todos.id)],
    });
    res.json(result);
});

router.post("/", async (req, res) => {
    // При создании ищем верхний элемент у которого самое большое число в поле position
    const lastItem = await db
        .select({ position: todos.position })
        .from(todos)
        .orderBy(desc(todos.position))
        .limit(1);

    // Стартовое значение STEP, а не 0, чтобы оставить место для вставки
    const newPosition = lastItem[0]?.position
        ? lastItem[0].position + STEP
        : STEP;

    const [newTodo] = await db
        .insert(todos)
        .values({
            title: req.body.title,
            position: newPosition,
        })
        .returning();

    res.json(newTodo);
});

router.put("/:id", async (req, res) => {
    const [updated] = await db
        .update(todos)
        .set(req.body)
        .where(eq(todos.id, +req.params.id))
        .returning();
    res.json(updated);
});

router.delete("/:id", async (req, res) => {
    await db.delete(todos).where(eq(todos.id, +req.params.id));
    res.sendStatus(204);
});

router.post("/reorder", async (req, res) => {
    try {
        const { movedId, beforeId } = req.body;

        // Получаем задачу, которую переместили
        const movedTodo = await db.query.todos.findFirst({
            where: (todos, { eq }) => eq(todos.id, movedId),
        });

        if (!movedTodo) {
            return res.status(404).json({ error: "Moved todo not found" });
        }

        let newPosition: number;

        if (beforeId === null) {
            // Переместили в самый конец
            const last = await db
                .select({ position: todos.position })
                .from(todos)
                .orderBy(asc(todos.position))
                .limit(1);

            const lastPosition = last[0].position ?? 0;
            newPosition = lastPosition - STEP;
        } else {
            // Получаем элемент, перед которым вставляем перемещаемый
            const beforeTodo = await db.query.todos.findFirst({
                where: (todos, { eq }) => eq(todos.id, beforeId),
            });

            if (!beforeTodo) {
                return res.status(404).json({ error: "Before todo not found" });
            }

            const beforeTodoPosition = beforeTodo.position ?? 0;

            // Получаем элемент, который будет стоять перед beforeTodo
            const prevTodo = await db
                .select()
                .from(todos)
                .where(
                    and(
                        gt(todos.position, beforeTodoPosition),
                        lt(todos.completed, true) // дополнительное условие
                    )
                )
                .orderBy(asc(todos.position))
                .limit(1);

            const prevPosition = prevTodo[0]?.position ?? beforeTodoPosition + (STEP * 2);

            newPosition = (prevPosition + beforeTodoPosition) / 2;
        }

        // Обновляем позицию перемещённой задачи
        await db
            .update(todos)
            .set({ position: newPosition })
            .where(eq(todos.id, movedId));

        res.json({ success: true });
    } catch (error) {
        console.error("Reorder error:", error);
        res.status(STEP).json({ error: "Internal server error" });
    }
});

export default router;
