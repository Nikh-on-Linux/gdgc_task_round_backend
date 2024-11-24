import { Router } from "express";
import { getList, addProduct, updateId, getSelectedItem, deleteProduct } from "../controller/listing.controller.js";

const router = Router();

router.get('/', getList);
router.get('/:id', getSelectedItem);
router.post('/', addProduct);
router.put('/:id', updateId);
router.delete('/:id', deleteProduct);

export default router;