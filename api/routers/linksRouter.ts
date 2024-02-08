import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import Link from '../models/links';

const linkRouter = Router();

const generateShortUrl = () => {
    const fullUuid = crypto.randomUUID();
    return fullUuid.replace(/-/g, '').substring(0, 7);
};

linkRouter.post('/links', async (req: Request, res: Response) => {
    try {
        const { originalUrl } = req.body;
        const shortUrl = generateShortUrl();

        const link = new Link({ originalUrl, shortUrl });
        await link.save();

        res.status(201).json({
            _id: link._id,
            shortUrl: link.shortUrl,
            originalUrl: link.originalUrl,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

linkRouter.get('/:shortUrl', async (req: Request, res: Response) => {
    try {
        const { shortUrl } = req.params;
        const link = await Link.findOne({ shortUrl });

        if (!link) {
            res.status(404).json({ error: 'Link not found' });
        } else {
            res.status(301).redirect(link.originalUrl);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default linkRouter;
