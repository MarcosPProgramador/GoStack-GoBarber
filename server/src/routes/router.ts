import { Router } from "express";
import appointmentsRouter from "./appointments.router";

const router = Router();

router.use("/appointments", appointmentsRouter);

export default router;
