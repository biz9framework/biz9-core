/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Core-Firebase
*/
module.exports = function(app_config){
    firebase_admin = require("firebase-admin");
    FIREBASE_KEY_FILE=app_config.firebase_key_file;
    module.send_message_topic=function(send_message,topic,callback){
        var error=null;
        async.series([
            function(call){
                var serviceAccount = require(FIREBASE_KEY_FILE);
                firebase_admin.initializeApp({
                    credential: firebase_admin.credential.cert(serviceAccount)
                });
                const message = {
                    notification: {
                        title:send_message.title,
                        body:send_message.body
                    },
                    topic: topic
                };
                firebase_admin
                    .messaging()
                    .send(message)
                    .then((response) => {
                        console.log('Successfully sent message:', response);
                        call();
                    })
                    .catch((error) => {
                        console.log('Error sending message:', error);
                        error=error;
                        call();
                    });
            }
        ],
            function(err, result){
                callback(error,message);
            });
    }
    return module;
}
