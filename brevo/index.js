/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Core-Brevo
*/
module.exports = function(){
    module.send_mail=function(brevo_key,brevo_obj,callback){
        var error=null;
        async.series([
            function(call){
                try {
                    var defaultClient = brevo_lib.ApiClient.instance;
                    var apiKey = defaultClient.authentications['api-key'];
                    apiKey.apiKey =brevo_key;
                    var apiInstance = new brevo_lib.TransactionalEmailsApi();
                    apiInstance.sendTransacEmail(brevo_obj).then(function(data) {
                        call();
                    }, function(_error) {
                        if(_error){
                            error='brevo mail error '+ _error.response.error.text;
                            biz9.o('brevo_send_mail_error',error);
                            call();
                        }
                    });
                } catch (e) {
                    error='brevo mail expection '+ e;
                    console.log(error);
                    call();
                }
            },
        ],
            function(err, result){
                callback(error,0);
            });
    }
    return module;
}
