import { Router } from "express";
import { redirectController } from "../Controllers/redirect.controller.js";
const router = Router();

router.get('/:nanoLink',redirectController)

export default router;