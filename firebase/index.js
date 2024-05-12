/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Core-Firebase
*/
module.exports = function(){
    module.send_message_topic=function(server_key,send_message,topic,callback){
        var gcm = require('node-gcm');
        var error=null;
        async.series([
            function(call){
                var sender = new gcm.Sender(server_key);
                var message = new gcm.Message({
                    data: {
                        title:send_message.title,
                        body:send_message.body,
                    }
                });
                sender.send(message, {to:topic},function(err,response){
                    if (err){
                        console.error(err);
                        error=err;
                        call();
                    }else{
                        call();
                    }
                });
            },
        ],
            function(err, result){
                callback(error,message);
            });
    }
    return module;
}
