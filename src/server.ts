import express from "express";
import cors from "cors";
import { pool } from "./db";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/tickets", async (req, res) => {
  const result = await pool.query("SELECT * FROM tickets ORDER BY created_at DESC");
  res.json(result.rows);
});

app.post("/api/tickets", async (req, res) => {
  const { customer_id, subject, priority } = req.body;
  const result = await pool.query(
    `INSERT INTO tickets (customer_id, subject, status, priority)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [customer_id, subject, "open", priority || "medium"]
  );
  res.status(201).json(result.rows[0]);
});

app.patch("/api/tickets/:id/close", async (req, res) => {
  const result = await pool.query(
    `UPDATE tickets SET status = 'closed' WHERE id = $1 RETURNING *`,
    [req.params.id]
  );
  if (result.rows.length === 0) return res.status(404).end();
  res.json(result.rows[0]);
});

app.listen(3001, () => console.log("API running on :3001"));
