import { Link } from "../Models/link.js";

export const redirectController = async(req, res) => {
    try {
        const {nanoLink}=req.params;
        const link = await Link.findOne({nanoLink:nanoLink});
        console.log(link);
        if(!link) {
            return res.status(404).json({error: "No Existe el link"});
        }

        return res.redirect(link.longLink);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
}
