import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    title     : { type: String, required: true },
    body      : { type: String, required: true },
    createdAt : { type: Date }
});

const Messages = mongoose.model('messages', MessagesSchema);