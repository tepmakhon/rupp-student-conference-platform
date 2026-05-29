import express from "express";
import cors from "cors";

import studentRoutes from "./routes/student.routes.js";
import orgRoutes from "./routes/organization.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import eventRoutes from "./routes/event.routes.js";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/events", eventRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/org", orgRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});