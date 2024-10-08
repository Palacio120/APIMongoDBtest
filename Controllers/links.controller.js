import { nanoid } from "nanoid";
import { Link } from "../Models/link.js";

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ uid: req.uid });
        res.json({ links });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
}

export const getLink= async(req, res) => {
    try {
        const {nanoLink}=req.params;
        const link = await Link.findOne({nanoLink:nanoLink});
        
        if(!link) {
            return res.status(404).json({error: "No Existe el link"});
        }

        res.json({ longLink:link.longLink });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
}

export const getLinkCRUD= async(req, res) => {
    try {
        const {id}=req.params;
        const link = await Link.findById(id);

        if(!link) {
            return res.status(404).json({error: "No Existe el link"});
        }

        if (!link.uid.equals(req.uid)){
            return res.status(401).json({error: "Not authorized"});
        }

        res.json({ link });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
}


export const postLinks = async (req, res) => {
    try {
        let { longLink } = req.body;
        if(!longLink.startsWith('https://')){
            longLink="https://"+ longLink;
        }
        const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });
        const newLink = await link.save();
        res.status(201).json({ newLink });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
}

export const deleteLink= async(req, res) => {
    try {
        const {id}=req.params;
        const link = await Link.findById(id);
        
        if(!link) {
            return res.status(404).json({error: "No Existe el link"});
        }
        
        if (!link.uid.equals(req.uid)){
            return res.status(401).json({error: "Not authorized"});
        }
        
        if(!longLink.startsWith('https://')){
            longLink="https://"+ longLink;
        }
        await link.remove();

        res.json({ link });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
}

export const patchLink= async(req, res) => {
    try {
        const {id}=req.params;
        const {longLink}= req.body;
        console.log(longLink);
        const link = await Link.findById(id);
        
        if(!longLink.startsWith('https://')){
            longLink="https://"+ longLink;
        }
        if(!link) {
            return res.status(404).json({error: "No Existe el link"});
        }
        
        if (!link.uid.equals(req.uid)){
            return res.status(401).json({error: "Not authorized"});
        }
        
        link.longLink= longLink;
        link.save();

        res.json({ link });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
}
