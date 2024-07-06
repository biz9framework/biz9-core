/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Core-Firebase
*/
module.exports = function(){
    module.send_message_topic=function(firebase_key_file,send_message,topic,callback){
        var error=null;
        async.series([
            function(call){
                biz9.o('firebase_key_file',firebase_key_file);
                biz9.o('send_message',send_message);
                biz9.o('topic',topic);
                var firebase_admin = require("firebase-admin");
                var firebase_init = firebase_admin.initializeApp({
                    credential: firebase_admin.credential.cert(require(firebase_key_file))
                },"biz9-core-firebase-"+biz9.get_id());
                const message = {
                    notification: {
                        title:send_message.title,
                        body:send_message.body
                    },
                    topic: topic
                };
                firebase_init
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
            },
            function(call){
                firebase_admin = null;
                call();
            },
        ],
            function(err, result){
                callback(error,message);
            });
    }
    return module;
}
