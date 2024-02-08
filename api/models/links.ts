import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface LinkModel extends Document {
    shortUrl: string;
    originalUrl: string;
}

const LinkSchema = new Schema({
    shortUrl: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
});

const Link  = mongoose.model('Link', LinkSchema);

export default Link;