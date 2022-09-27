/* Copyright (C) 2021 9_OPZ #Certified CoderZ
 * GNU GENERAL PUBLIC LICENSE
 * Full LICENSE file ( gpl-3.0-licence.txt )
 * BiZ9 Framework
 * Core-AWZ
 */
module.exports = function(){
    G_AWS_REGION = aws_config.aws_region;
    G_AWS_KEY = aws_config.aws_key;
    G_AWS_SECRET = aws_config.aws_secret;
    module.get_bucket_data = function(bucket,key,callback){
        aws.config.update({ accessKeyId: G_AWS_KEY, secretAccessKey: G_AWS_SECRET, region:G_AWS_REGION});
        var s3 = new aws.S3();
        var r_data='';
        if(key){
            var params = {
                Bucket:String(bucket),
                Key:String(key),
                ACL: "public-read"
            };
            s3.getObject(params,function(error,data){
                if(data){
                    if(data.Body){
                        r_data = data.Body.toString('utf-8');
                    }
                }
                callback(error,r_data);
            });
        }
        else{
            callback(error,r_data);
        }
    }
    module.update_bucket=function(title,callback){
        aws.config.update({accessKeyId:G_AWS_KEY,secretAccessKey:G_AWS_SECRET,region:G_AWS_REGION});
        const REGION = G_AWS_REGION;
        s3 = new aws.S3();
        var params = {
            Bucket:title
        };
        s3.createBucket(params, function(error,data) {
            callback(error,data);
        });
    }
    module.update_bucket_file=function(bucket,file_path,key,callback){
        var p_buffer={};
        var error=null;
        async.series([
            function(call){
                utilityz.get_file_buffer(file_path,function(error,data){
                    p_buffer=data;
                    call();
                });
            },
            function(call){
                aws.config.update({accessKeyId:G_AWS_KEY,secretAccessKey:G_AWS_SECRET,region:G_AWS_REGION});
                s3 = new aws.S3();
                if(p_buffer){
                    var params = {
                        Body: Buffer.from(p_buffer,'utf-8'),
                        Bucket:String(bucket),
                        Key:String(key),
                        ACL: "public-read"
                    };
                    s3.putObject(params,function(error,data){
                        call();
                    });
                }
        }
        ],
            function(err, result){
                callback(error,0);
            });
    }
    return module;
}