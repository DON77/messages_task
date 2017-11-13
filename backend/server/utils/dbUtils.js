import mongoose from 'mongoose';
import '../models/messages';

import config from '../../config/config.json';

const Messages = mongoose.model('messages');

export function dbConnection(){
    mongoose.Promise = global.Promise
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`, {
        useMongoClient: true,
    });
}

export function listMessages() {
    return Messages.find(
    ).sort({_id : -1});
}

export function createMessage(data) {

    const message = new Messages({
        title: data.title,
        body: data.body,
        createdAt: new Date()
    });

    return message.save();
}

export function deleteMessage(id) {
    return Messages.findById(id).remove();
}

export function editMessage(data) {
    var result = Messages.findById(data.id, function (err, messages) {
        if (err) return handleError(err);
        
        messages.title = data.title;
        messages.body = data.body;
    
        return messages.save();        
      });
    
      return result;
    }

export function getMessageById(id){
    return Messages.findById(id)
    
}    