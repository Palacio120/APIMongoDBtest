import { Router } from "express";
import { deleteLink, getLink, getLinks, patchLink, postLinks } from "../Controllers/links.controller.js";
import { requireToken } from "../Midelwares/requireToken.js";
import { bodyLinkValidator, paramsValidator } from "../Midelwares/validationResultsExpress.js";
const router = Router();

// GET      api/v1/links                all links
// GET      api/v1/links/:nanoLink      search link
// POST     api/v1/links                create link
// PATCH    api/v1/links                update link
// DELETE   api/v1/links/:nanoLink      remove link

router.get('/', requireToken, getLinks);
router.get('/:nanoLink', paramsValidator, getLink);
router.post('/', requireToken, bodyLinkValidator, postLinks);
router.patch('/:id',requireToken, paramsValidator, bodyLinkValidator,patchLink)
router.delete('/:id', requireToken, paramsValidator, deleteLink);

export default router;