/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Core-Mail
*/
module.exports = function(){
    module.send_mail = function(mail,callback){
        aws.config.update({accessKeyId:mail.aws_key,secretAccessKey:mail.aws_secret, region:mail.aws_region});
        var ses = new aws.SES();
        var params = {
            Destination: {
                CcAddresses: [
                    String(mail.to)
                ],
                ToAddresses: [
                    String(mail.to)
                ]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: String(mail.body)
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: String(mail.body)
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: String(mail.subject)
                }
            },
            Source: mail.from,
            ReplyToAddresses: [
                String(mail.to)
            ],
        };
        ses.sendEmail(params, function(error,data){
            callback(error,mail);
        });
    }
    return module;
}

