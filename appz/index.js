/* Copyright (C) 2019 9_OPZ #Certified CoderZ
 * GNU GENERAL PUBLIC LICENSE
 * Full LICENSE file ( gpl-3.0-licence.txt )
 * BiZ9 Framework
 * Core-AppZ
 */
module.exports = function(app_config){
    APP_ID=app_config.app_id;
    APP_TITLE_ID=app_config.app_title_id;
    APP_TITLE=app_config.app_title;
    APP_VERSION=app_config.app_version;
    FILE_URL=app_config.file_url;
    BIZ_MAP=app_config.biz_map;
    DT_ITEM_MAP='item_map_biz';
    DT_ITEM='item_biz';
    DT_BLANK='blank_biz';
    DT_PHOTO='photo_biz';
    DT_USER='user_biz';
    DT_TEAM='team_biz';
    DT_ADMIN='admin_biz';
    DT_PROJECT='project_biz';
    DT_GALLERY='gallery_biz';
    DT_PRODUCT='product_biz';
    DT_CART_ITEM="cart_item_biz";
    DT_ORDER="order_biz";
    DT_ORDER_ITEM="order_item_biz";
    DT_BLOG_POST='blog_post_biz';
    DT_SERVICE='service_biz';
    DT_COMMENT='comment_biz';
    module.set_item_data = function(data_type,tbl_id,item_data){
        var item = {};
        for (key in  item_data) {
            item[key] = item_data[key].trim();
        }
        item['tbl_id'] = tbl_id;
        item['data_type'] = data_type;
        return item;
    }
    module.get_new_biz_item=function(data_type,tbl_id) {
        return appz.set_biz_item(appz.get_new_item(data_type,tbl_id));
    }
    module.get_new_item=function(data_type,tbl_id) {
        if(!tbl_id){
            tbl_id=0;
        }
        item = {data_type:data_type,tbl_id:tbl_id};
        return item;
    }
    module.get_test_item = function(data_type,tbl_id){
        if(!tbl_id){
            tbl_id=0;
        }
        if(!data_type){
            data_type=DT_BLANK;
        }
        item=appz.get_new_item(data_type,tbl_id);
        test_id=utilityz.get_id();
        item.order=test_id;
        item.title='title_'+test_id;
        item.sub_note='sub_note_'+test_id;
        return item;
    }
    module.get_test_user = function(){
        var test_id = utilityz.get_id();
        var item = appz.get_new_item(DT_USER,0);;
        item.email = 'email'+test_id+'@gmail.com';
        item.user_name = 'user_name'+test_id;
        item.first_name = 'firstname'+test_id;
        item.last_name = 'last_name'+test_id;
        item.password = '1234567';
        item.order=test_id;
        item=appz.set_biz_item(item);
        return item;
    }
    module.get_item_not_found=function(date_type,tbl_id) {
        if(!data_type){
            data_type='blank';
        }
        if(!tbl_id){
            tbl_id=0;
        }
        var item=appz.get_new_item(data_type,tbl_id);
        return item;
    }
    module.check_user = function(req,res,next){
        var u = appz.get_user(req);
        check_ok=false;
        if(u.tbl_id!=0){
            if(u.data_type==DT_USER||u.data_type==DT_ADMIN){
                check_ok=true;
            }
        }
        if(check_ok){
            next();
        }
        else {
            res.redirect('/login');
        }
    }
    module.check_customer = function(req,res,next){
        var u = appz.get_user(req);
        check_ok=false;
        if(u.tbl_id!=0){
            if(u.data_type==DT_CUSTOMER||u.data_type==DT_USER||u.data_type==DT_ADMIN){
                check_ok=true;
            }
        }
        if(check_ok){
            next();
        }
        else {
            res.redirect('/login');
        }
    }
    module.check_admin = function(req,res,next){
        var u = appz.get_user(req);
        check_ok=false;
        if(u.tbl_id!=0){
            if(u.data_type==DT_ADMIN){
                check_ok=true;
            }
        }
        if(check_ok){
            next();
        }
        else {
            res.redirect('/login');
        }
    }
    module.get_user = function(req){
        if(req.session.user){
            //return appz.set_biz_item(req.session.user);//removed
            return req.session.user;
        }else{
            //return app.set_biz_item({tbl_id:0,data_type:DT_USER});
            return {tbl_id:0,data_type:DT_USER};
        }
    }
    module.save_user = function(req,user){
        req.session.user=user;
    }
    module.del_user = function(req){
        req.session.user=null;
        delete req.session.user;
    }
    module.get_cookie = function(req,title){
        return req.session[title];
    }
    module.save_cookie = function(req,title,obj){
        req.session[title]=obj;
    }
    module.del_cookie = function(req,title){
        req.session[title]=null;
        delete req.session[title];
    }
    module.account_validate_password = function(password,callback) {
        var _error = null;
        async.series([
            function(call){
                if(!password){
                    _error='Passwords must be at least 6 characters.';
                }
                else if(password.length<6){
                    _error='Passwords must be at least 6 characters.';
                }
                call();
            }
        ],
            function(err, result){
                callback(_error,0);
            });
    }
    module.account_validate_user_name=function(db,data_type,tbl_id,user_name,callback) {
        var _error=null;
        async.series([
            function(call){
                // validate user_name length
                if(!user_name){
                    _error='Invalid user name.';
                }
                else if(user_name.length<3){
                    _error='Invalid user name.';
                }
                call();
            },
            // validate user_name owner
            function(call){
                if(_error==null){
                    sql_obj = {user_name:user_name};
                    dataz.get_sql_cache(db,data_type,sql_obj,{},function(data_list){
                        if(data_list.length > 0){
                            // if item add, already exsist
                            if(tbl_id == '0'){
                                _error = "The user name " + user_name+ " already exist.";
                                call();
                            }
                            // check owner of user name
                            else if(tbl_id != data_list[0].tbl_id){
                                _error = "The user name " + user_name+ " already exist.";
                                call();
                            }
                            else{
                                // user_name availble
                                call();
                            }
                        }
                        else{
                            // user_name availble
                            call();
                        }
                    });
                }else{
                    call();
                }
            }
        ],
            // last
            function(err, result){
                callback(_error,0);
            });
    }
    //email
    module.account_validate_email = function(db,data_type,tbl_id,email,callback) {
        var _error=null;
        async.series([
            function(call){
                // validate email length
                if(!email){
                    _error='Invalid email address.';
                }
                else if(email.length<3){
                    _error='Invalid email address.';
                }
                else if(!utilityz.validate_email(email)){
                    _error='Invalid email address.';
                }
                call();
            },
            // validate email owner
            function(call){
                if(_error==null){
                    sql_obj = {email:email};
                    dataz.get_sql_cache(db,data_type,sql_obj,{},function(error,data_list){
                        if(error){
                            _error=error;
                        }
                        if(data_list.length > 0){
                            if(tbl_id == '0'){
                                _error = "The email " + email+ " already exist.";
                                call();
                            }
                            else if(tbl_id != data_list[0].tbl_id){
                                _error = "The email " + _email+ " already exist.";
                                call();
                            }
                            else{
                                call();
                            }
                        }
                        else{
                            call();
                        }
                    });
                }else{
                    call();
                }
            }
        ],
            // last
            function(err, result){
                callback(_error,0);
            });
    }
    module.get_helper = function(req) {
        var helper = {};
        helper.url = req.protocol+"://"+req.headers.host+req.originalUrl;
        helper.error=null;
        if(req.query){
            for (var key in  req.query) {
                helper[key] = req.query[key].trim();
            }
        }
        if(req.body){
            for (var key in  req.body) {
                if(String(req.body[key])){
                    req.body[key] = String(req.body[key]).trim();
                    helper[key] = String(req.body[key]).trim();
                }
            }
        }
        if(req.params){
            for (var key in req.params) {
                helper[key]=req.params[key].trim();
            }
        }
        helper.app_id=APP_ID;
        helper.app_title=APP_TITLE;
        helper.app_version=APP_VERSION;
        if(APP_TITLE_ID){
            helper.app_title_id=APP_TITLE_ID;
        }else{
            helper.app_title_id=helper.app_title_id;
        }
        return helper;
    }
    module.get_helper_user = function(req) {
        var helper = {};
        helper.url = req.protocol+"://"+req.headers.host+req.originalUrl;
        helper.user = appz.get_user(req);
        helper.error=null;
        if(req.query){
            for (var key in  req.query) {
                helper[key] = req.query[key].trim();
            }
        }
        if(req.body){
            for (var key in  req.body) {
                if(String(req.body[key])){
                    req.body[key] = String(req.body[key]).trim();
                    helper[key] = String(req.body[key]).trim();
                }
            }
        }
        if(req.params){
            for (var key in req.params) {
                helper[key]=req.params[key].trim();
            }
        }
        helper.app_id=APP_ID;
        helper.app_title=APP_TITLE;
        helper.app_version=APP_VERSION;
        if(APP_TITLE_ID){
            helper.app_title_id=APP_TITLE_ID
        }else{
            if(req.subdomains[0]){
                helper.app_title_id=req.subdomains[0];
            }else{
                helper.app_title_id=helper.app_title_id;
            }
        }
        return helper;
    }
    module.set_new_sub_item_parent=function(data_type,org_item){
        var _sub_item = appz.get_new_item(data_type,0);
        _sub_item.title=org_item.title;
        _sub_item.title_url=org_item.title_url;
        _sub_item.field_1=org_item.field_1;
        _sub_item.field_2=org_item.field_2;
        _sub_item.field_3=org_item.field_3;
        _sub_item.field_4=org_item.field_4;
        _sub_item.field_5=org_item.field_5;
        _sub_item.field_6=org_item.field_6;
        _sub_item.field_7=org_item.field_7;
        _sub_item.field_8=org_item.field_8;
        _sub_item.field_9=org_item.field_9;
        _sub_item.field_10=org_item.field_10;
        _sub_item.field_11=org_item.field_11;
        _sub_item.field_12=org_item.field_12;
        _sub_item.value_1=org_item.value_1;
        _sub_item.value_2=org_item.value_2;
        _sub_item.value_3=org_item.value_3;
        _sub_item.value_4=org_item.value_4;
        _sub_item.value_5=org_item.value_5;
        _sub_item.value_6=org_item.value_6;
        _sub_item.value_7=org_item.value_7;
        _sub_item.value_8=org_item.value_8;
        _sub_item.value_9=org_item.value_9;
        _sub_item.value_10=org_item.value_10;
        _sub_item.value_11=org_item.value_11;
        _sub_item.value_12=org_item.value_12;
        _sub_item.date_1=org_item.date_1;
        _sub_item.date_2=org_item.date_2;
        _sub_item.date_3=org_item.date_3;
        _sub_item.date_value_1=org_item.date_value_1;
        _sub_item.date_value_2=org_item.date_value_2;
        _sub_item.date_value_3=org_item.date_value_3;
        _sub_item.order=org_item.order;
        _sub_item.category=org_item.category;
        _sub_item.sub_note=org_item.sub_note;
        _sub_item.visible=org_item.visible;
        _sub_item.photofilename=org_item.photofilename;
        _sub_item.parent_tbl_id=org_item.parent_tbl_id;
        _sub_item.org_tbl_id=org_item.tbl_id;
        return _sub_item;
    }
    module.set_new_sub_item = function(data_type,org_item){
        var _sub_item = appz.get_new_item(data_type,0);
        if(org_item.is_parent){
            _sub_item.title='_copy_'+org_item.title;
            _sub_item.title_url='_copy_'+org_item.title_url;
        }else{
            _sub_item.title=org_item.title;
            _sub_item.title_url=org_item.title_url;
        }
        _sub_item.note=org_item.note;
        _sub_item.html=org_item.html;
        _sub_item.field_1=org_item.field_1;
        _sub_item.field_2=org_item.field_2;
        _sub_item.field_3=org_item.field_3;
        _sub_item.field_4=org_item.field_4;
        _sub_item.field_5=org_item.field_5;
        _sub_item.field_6=org_item.field_6;
        _sub_item.field_7=org_item.field_7;
        _sub_item.field_8=org_item.field_8;
        _sub_item.field_9=org_item.field_9;
        _sub_item.field_10=org_item.field_10;
        _sub_item.field_11=org_item.field_11;
        _sub_item.field_12=org_item.field_12;
        _sub_item.value_1=org_item.value_1;
        _sub_item.value_2=org_item.value_2;
        _sub_item.value_3=org_item.value_3;
        _sub_item.value_4=org_item.value_4;
        _sub_item.value_5=org_item.value_5;
        _sub_item.value_6=org_item.value_6;
        _sub_item.value_7=org_item.value_7;
        _sub_item.value_8=org_item.value_8;
        _sub_item.value_9=org_item.value_9;
        _sub_item.value_10=org_item.value_10;
        _sub_item.value_11=org_item.value_11;
        _sub_item.value_12=org_item.value_12;
        _sub_item.date_1=org_item.date_1;
        _sub_item.date_2=org_item.date_2;
        _sub_item.date_3=org_item.date_3;
        _sub_item.date_value_1=org_item.date_value_1;
        _sub_item.date_value_2=org_item.date_value_2;
        _sub_item.date_value_3=org_item.date_value_3;
        _sub_item.order=org_item.order;
        _sub_item.category=org_item.category;
        _sub_item.visible=org_item.visible;
        _sub_item.photofilename=org_item.photofilename;
        _sub_item.org_tbl_id=org_item.tbl_id;
        _sub_item.parent_tbl_id=org_item.parent_tbl_id;
        return _sub_item;
    }
    module.set_new_blog_post=function(data_type,org_item){
        var _blog_post = appz.get_new_item(data_type,0);
        _blog_post.title='_copy_'+org_item.title;
        _blog_post.title_url='_copy_'+org_item.title_url;
        _blog_post.photofilename=org_item.photofilename;
        _blog_post.visible=org_item.visible;
        _blog_post.category=org_item.category;
        _blog_post.order=org_item.order;
        _blog_post.note=org_item.note;
        _blog_post.tags=org_item.tags;
        _blog_post.html=org_item.html;
        _blog_post.sub_note=org_item.sub_note;
        _blog_post.search=org_item.search;
        _blog_post.field_1=org_item.field_1;
        _blog_post.field_2=org_item.field_2;
        _blog_post.field_3=org_item.field_3;
        _blog_post.field_4=org_item.field_4;
        _blog_post.field_5=org_item.field_5;
        _blog_post.field_6=org_item.field_6;
        _blog_post.field_7=org_item.field_7;
        _blog_post.field_8=org_item.field_8;
        _blog_post.field_9=org_item.field_9;
        _blog_post.field_10=org_item.field_10;
        _blog_post.field_11=org_item.field_11;
        _blog_post.field_12=org_item.field_12;
        _blog_post.date_1=org_item.date_1;
        _blog_post.date_2=org_item.date_2;
        _blog_post.date_3=org_item.date_3;
        _blog_post.date_value_1=org_item.date_value_1;
        _blog_post.date_value_2=org_item.date_value_2;
        _blog_post.date_value_3=org_item.date_value_3;
        _blog_post.value_1=org_item.value_1;
        _blog_post.value_2=org_item.value_2;
        _blog_post.value_3=org_item.value_3;
        _blog_post.value_4=org_item.value_4;
        _blog_post.value_5=org_item.value_5;
        _blog_post.value_6=org_item.value_6;
        _blog_post.value_7=org_item.value_7;
        _blog_post.value_8=org_item.value_8;
        _blog_post.value_9=org_item.value_9;
        _blog_post.value_10=org_item.value_10;
        _blog_post.value_11=org_item.value_11;
        _blog_post.value_12=org_item.value_12;
        return _blog_post;
    }
    module.set_new_team=function(data_type,org_item){
        var _team = appz.get_new_item(data_type,0);
        _team.title='_copy_'+org_item.title;
        _team.title_url='_copy_'+org_item.title_url;
        _team.photofilename=org_item.photofilename;
        _team.position=org_item.position;
        _team.bio=org_item.bio;
        _team.visible=org_item.visible;
        _team.order=org_item.order;
        _team.note=org_item.note;
        _team.search=org_item.search;
        _team.field_1=org_item.field_1;
        _team.field_2=org_item.field_2;
        _team.field_3=org_item.field_3;
        _team.field_4=org_item.field_4;
        _team.field_5=org_item.field_5;
        _team.field_6=org_item.field_6;
        _team.field_7=org_item.field_7;
        _team.field_8=org_item.field_8;
        _team.field_9=org_item.field_9;
        _team.field_10=org_item.field_10;
        _team.field_11=org_item.field_11;
        _team.field_12=org_item.field_12;
        _team.date_1=org_item.date_1;
        _team.date_2=org_item.date_2;
        _team.date_3=org_item.date_3;
        _team.date_value_1=org_item.date_value_1;
        _team.date_value_2=org_item.date_value_2;
        _team.date_value_3=org_item.date_value_3;
        _team.value_1=org_item.value_1;
        _team.value_2=org_item.value_2;
        _team.value_3=org_item.value_3;
        _team.value_4=org_item.value_4;
        _team.value_5=org_item.value_5;
        _team.value_6=org_item.value_6;
        _team.value_7=org_item.value_7;
        _team.value_8=org_item.value_8;
        _team.value_9=org_item.value_9;
        _team.value_10=org_item.value_10;
        _team.value_11=org_item.value_11;
        _team.value_12=org_item.value_12;
        return _team;
    }
    module.set_new_event=function(data_type,org_item){
        var _event = appz.get_new_item(data_type,0);
        _event.title='copy_'+org_item.title;
        _event.title_url='copy_'+org_item.title_url;
        _event.photofilename=org_item.photofilename;
        _event.visible=org_item.visible;
        _event.start_date=org_item.start_date;
        _event.start_time=org_item.start_time;
        _event.location=org_item.location;
        _event.type=org_item.type;
        _event.category=org_item.category;
        _event.price=org_item.price;
        _event.order=org_item.order;
        _event.note=org_item.note;
        _event.sub_note=org_item.sub_note;
        _event.html=org_item.html;
        _event.tags=org_item.tags;
        _event.field_1=org_item.field_1;
        _event.field_2=org_item.field_2;
        _event.field_3=org_item.field_3;
        _event.field_4=org_item.field_4;
        _event.field_5=org_item.field_5;
        _event.field_6=org_item.field_6;
        _event.field_7=org_item.field_7;
        _event.field_8=org_item.field_8;
        _event.field_9=org_item.field_9;
        _event.field_10=org_item.field_10;
        _event.field_11=org_item.field_11;
        _event.field_12=org_item.field_12;
        _event.value_1=org_item.value_1;
        _event.value_2=org_item.value_2;
        _event.value_3=org_item.value_3;
        _event.value_4=org_item.value_4;
        _event.value_5=org_item.value_5;
        _event.value_6=org_item.value_6;
        _event.value_7=org_item.value_7;
        _event.value_8=org_item.value_8;
        _event.value_9=org_item.value_9;
        _event.value_10=org_item.value_10;
        _event.value_11=org_item.value_11;
        _event.value_12=org_item.value_12;
        _event.date_1=org_item.date_1;
        _event.date_2=org_item.date_2;
        _event.date_3=org_item.date_3;
        _event.date_value_1=org_item.date_value_1;
        _event.date_value_2=org_item.date_value_2;
        _event.date_value_3=org_item.date_value_3;
        _event.search=org_item.search;
        return _event;
    }
    module.set_new_product=function(data_type,org_item){
        var _product = appz.get_new_item(data_type,0);
        _product.title='copy_'+org_item.title;
        _product.title_url='copy_'+org_item.title_url;
        _product.photofilename=org_item.photofilename;
        _product.visible=org_item.visible;
        _product.category=org_item.category;
        _product.order=org_item.order;
        _product.note=org_item.note;
        _product.sub_note=org_item.sub_note;
        _product.html=org_item.html;
        _product.tags=org_item.tags;
        _product.price=org_item.price;
        _product.original_price=org_item.original_price;
        _product.stock=org_item.stock;
        _product.sku=org_item.sku;
        _product.type=org_item.type;
        _product.sub_type=org_item.sub_type;
        _product.shipping_title_1=org_item.shipping_title_1;
        _product.shipping_price_1=org_item.shipping_price_1;
        _product.shipping_title_2=org_item.shipping_title_2;
        _product.shipping_price_2=org_item.shipping_price_2;
        _product.field_1=org_item.field_1;
        _product.field_2=org_item.field_2;
        _product.field_3=org_item.field_3;
        _product.field_4=org_item.field_4;
        _product.field_5=org_item.field_5;
        _product.field_6=org_item.field_6;
        _product.field_7=org_item.field_7;
        _product.field_8=org_item.field_8;
        _product.field_9=org_item.field_9;
        _product.field_10=org_item.field_10;
        _product.field_11=org_item.field_11;
        _product.field_12=org_item.field_12;
        _product.value_1=org_item.value_1;
        _product.value_2=org_item.value_2;
        _product.value_3=org_item.value_3;
        _product.value_4=org_item.value_4;
        _product.value_5=org_item.value_5;
        _product.value_6=org_item.value_6;
        _product.value_7=org_item.value_7;
        _product.value_8=org_item.value_8;
        _product.value_9=org_item.value_9;
        _product.value_10=org_item.value_10;
        _product.value_11=org_item.value_11;
        _product.value_12=org_item.value_12;
        _product.date_1=org_item.date_1;
        _product.date_2=org_item.date_2;
        _product.date_3=org_item.date_3;
        _product.date_value_1=org_item.date_value_1;
        _product.date_value_2=org_item.date_value_2;
        _product.date_value_3=org_item.date_value_3;
        _product.search=org_item.search;
        return _product;
    }
    module.set_new_project=function(data_type,org_item){
        var _project=appz.get_new_item(data_type,0);
        _project.title='copy_'+org_item.title;
        _project.title_url='copy_'+org_item.title_url;
        _project.visible=org_item.visible;
        _project.category=org_item.category;
        _project.sub_note=org_item.sub_note;
        _project.type=org_item.type;
        _project.sub_type=org_item.sub_type;
        _project.order=org_item.order;
        _project.note=org_item.note;
        _project.photofilename=org_item.photofilename;
        _project.tags=org_item.tags;
        _project.html=org_item.html;
        _project.regular_price=org_item.regular_price;
        _project.sale_price=org_item.sale_price;
        _project.field_1=org_item.field_1;
        _project.field_2=org_item.field_2;
        _project.field_3=org_item.field_3;
        _project.field_4=org_item.field_4;
        _project.field_5=org_item.field_5;
        _project.field_6=org_item.field_6;
        _project.field_7=org_item.field_7;
        _project.field_8=org_item.field_8;
        _project.field_9=org_item.field_9;
        _project.field_10=org_item.field_10;
        _project.field_11=org_item.field_11;
        _project.field_12=org_item.field_12;
        _project.value_1=org_item.value_1;
        _project.value_2=org_item.value_2;
        _project.value_3=org_item.value_3;
        _project.value_4=org_item.value_4;
        _project.value_5=org_item.value_5;
        _project.value_6=org_item.value_6;
        _project.value_7=org_item.value_7;
        _project.value_8=org_item.value_8;
        _project.value_9=org_item.value_9;
        _project.value_10=org_item.value_10;
        _project.value_11=org_item.value_11;
        _project.value_12=org_item.value_12;
        _project.date_1=org_item.date_1;
        _project.date_2=org_item.date_2;
        _project.date_3=org_item.date_3;
        _project.date_value_1=org_item.date_value_1;
        _project.date_value_2=org_item.date_value_2;
        _project.date_value_3=org_item.date_value_3;
        _project.search=org_item.search;
        return _project;
    }
    module.set_new_service=function(data_type,org_item){
        var _service=appz.get_new_item(data_type,0);
        _service.title='copy_'+org_item.title;
        _service.title_url='copy_'+org_item.title_url;
        _service.visible=org_item.visible;
        _service.category=org_item.category;
        _service.sub_note=org_item.sub_note;
        _service.price=org_item.price;
        _service.type=org_item.type;
        _service.sub_type=org_item.sub_type;
        _service.order=org_item.order;
        _service.note=org_item.note;
        _service.photofilename=org_item.photofilename;
        _service.tags=org_item.tags;
        _service.html=org_item.html;
        _service.regular_price=org_item.regular_price;
        _service.sale_price=org_item.sale_price;
        _service.field_1=org_item.field_1;
        _service.field_2=org_item.field_2;
        _service.field_3=org_item.field_3;
        _service.field_4=org_item.field_4;
        _service.field_5=org_item.field_5;
        _service.field_6=org_item.field_6;
        _service.field_7=org_item.field_7;
        _service.field_8=org_item.field_8;
        _service.field_9=org_item.field_9;
        _service.field_10=org_item.field_10;
        _service.field_11=org_item.field_11;
        _service.field_12=org_item.field_12;
        _service.value_1=org_item.value_1;
        _service.value_2=org_item.value_2;
        _service.value_3=org_item.value_3;
        _service.value_4=org_item.value_4;
        _service.value_5=org_item.value_5;
        _service.value_6=org_item.value_6;
        _service.value_7=org_item.value_7;
        _service.value_8=org_item.value_8;
        _service.value_9=org_item.value_9;
        _service.value_10=org_item.value_10;
        _service.value_11=org_item.value_11;
        _service.value_12=org_item.value_12;
        _service.date_1=org_item.date_1;
        _service.date_2=org_item.date_2;
        _service.date_3=org_item.date_3;
        _service.date_value_1=org_item.date_value_1;
        _service.date_value_2=org_item.date_value_2;
        _service.date_value_3=org_item.date_value_3;
        _service.search=org_item.search;
        return _service;
    }
    module.get_key_sort_type=function(key){
        return _get_key_sort_type(key);
    }
    _get_key_sort_type=function(key){
        sort={order:1};
        if(key.setting_sort_type=='order'){
            if(key.setting_sort_order=='asc'){
                sort={order:1};
            }else{
                sort={order:-1};
            }
        }
        else if(key.setting_sort_type=='date_create'){
            if(key.setting_sort_order=='asc'){
                sort={date_create:1};
            }else{
                sort={date_create:-1};
            }
        }
        return sort;
    }
    module.set_biz_item=function(item){
        var no_photo=true;
        _photo_size_album='';
        _photo_size_thumb='thumb_size_';
        _photo_size_mid='mid_size_';
        _photo_size_large='large_size_';

        _photo_size_square_thumb='square_thumb_size_';
        _photo_size_square_mid='square_mid_size_';
        _photo_size_square_large='square_large_size_';

        if(!item){
            biz9.o('_set_biz_item_not_found',item);
        }
        if(item.photofilename){
            no_photo=false;
            item.photo={
                album_url:FILE_URL+item.photofilename,
                thumb_url:FILE_URL+_photo_size_thumb+item.photofilename,
                mid_url:FILE_URL+_photo_size_mid+item.photofilename,
                large_url:FILE_URL+_photo_size_large+item.photofilename,
                thumb_url:FILE_URL+_photo_size_thumb+item.photofilename,
                square_thumb_url:FILE_URL+_photo_size_square_thumb+item.photofilename,
                square_mid_url:FILE_URL+_photo_size_square_thumb+item.photofilename,
                square_large_url:FILE_URL+_photo_size_square_thumb+item.photofilename,
            };
        }
        if(no_photo){
            str='/images/no_image.png';
            item.photofilename=null;
            item.photo={
                album_url:str,
                thumb_url:str,
                mid_url:str,
                large_url:str,
                square_thumb_url:str,
                square_mid_url:str
            };
        }
        if(item.date_create){
            item.date={
                pretty_create:utilityz.get_date_pretty(item.date_create),
                pretty_update:utilityz.get_date_pretty(item.date_save),
                full_create:utilityz.get_datetime_full(item.date_create),
                full_update:utilityz.get_datetime_full(item.date_save),
                month_create:biz9.get_month_title_short(1+biz9.get_datetime_full_obj(item.date_create).month()),
                month_update:biz9.get_month_title_short(1+biz9.get_datetime_full_obj(item.date_save).month()),
                date_create:biz9.get_datetime_full_obj(item.date_create).date(),
                date_update:biz9.get_datetime_full_obj(item.date_save).date(),
                year_create:biz9.get_datetime_full_obj(item.date_create).year(),
                time_create:biz9.get_datetime_full_obj(item.date_create).format('hh:mm a'),
                time_update:biz9.get_datetime_full_obj(item.date_save).format('hh:mm a')
            }
        }
        if(BIZ_MAP==true){
            if(item.field_1){
                item[item.field_1]=item.value_1;
            }
            if(item.field_2){
                item[item.field_2]=item.value_2;
            }
            if(item.field_3){
                item[item.field_3]=item.value_3;
            }
            if(item.field_4){
                item[item.field_4]=item.value_4;
            }
            if(item.field_5){
                item[item.field_5]=item.value_5;
            }
            if(item.field_6){
                item[item.field_6]=item.value_6;
            }
            if(item.field_7){
                item[item.field_7]=item.value_7;
            }
            if(item.field_8){
                item[item.field_8]=item.value_8;
            }
            if(item.field_9){
                item[item.field_9]=item.value_9;
            }
            if(item.field_10){
                item[item.field_10]=item.value_10;
            }
            if(item.field_11){
                item[item.field_11]=item.value_11;
            }
            if(item.field_12){
                item[item.field_12]=item.value_12;
            }
            if(item.date_1){
                item[item.date_1]=item.value_9;
            }
            if(item.date_2){
                item[item.date_2]=item.value_10;
            }
            if(item.date_3){
                item[item.date_3]=item.value_11;
            }
            if(item.date_value_1){
                item[item.date_value_1]=biz9.get_date_full(item.date_value_1);
            }
            if(item.date_value_2){
                item[item.date_value_2]=biz9.get_date_full(item.date_value_2);
            }
            if(item.date_value_3){
                item[item.date_value_3]=biz9.get_date_full(item.date_value_3);
            }
        }
        return item;
    }
    module.get_test_note=function(){
        var str = "<div>"+
            "<h2>What is Lorem Ipsum?</h2>"+
            "<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and"+
            "typesetting industry. Lorem Ipsum has been the industry's standard "+
            "dummy text ever since the 1500s, when an unknown printer took a galley "+
            "of type and scrambled it to make a type specimen book. It has survived"+
            "not only five centuries, but also the leap into electronic typesetting, "+
            "remaining essentially unchanged. It was popularised in the 1960s with  "+
            "the release of Letraset sheets containing Lorem Ipsum passages, and more "+
            "recently with desktop publishing software like Aldus PageMaker "+
            "including versions of Lorem Ipsum.</p> "+
            "</div><div> "+
            "<h2>Why do we use it?</h2> "+
            "<p>It is a long established fact that a reader will be distracted by the "+
            "readable content of a page when looking at its layout. The point of  "+
            "using Lorem Ipsum is that it has a more-or-less normal distribution of  "+
            "letters, as opposed to using 'Content here, content here', making it  "+
            "look like readable English. Many desktop publishing packages and web  "+
            "page editors now use Lorem Ipsum as their default model text, and a  "+
            "search for 'lorem ipsum' will uncover many web sites still in their  "+
            "infancy. Various versions have evolved over the years, sometimes by  "+
            "accident, sometimes on purpose (injected humour and the like).</p> "+
            "</div><br><div> "+
            "	injected humour, or non-characteristic words etc.</p>";
        return str;
    }
    module.get_blog_post=function(db,title_url,callback){
        var blog_post=appz.get_new_item(DT_BLOG_POST,0);
        var full_photo_list=[];
        var other_list=[];
        async.series([
            function(call){
                sql = {title_url:title_url};
                sort={};
                dataz.get_sql_cache(db,DT_BLOG_POST,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    if(data_list.length>0){
                        if(data_list[0].tbl_id!=0 &&data_list[0]){
                            blog_post=data_list[0];
                        }
                    }
                    blog_post.photos=[];
                    blog_post.items=[];
                    call();
                });
            },
            function(call){
                sql = {};
                sort={};
                dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    for(a=0;a<data_list.length;a++){
                        full_photo_list.push(data_list[a]);
                    }
                    call();
                });
            },
            function(call){
                sql={parent_tbl_id:blog_post.tbl_id};
                sort={order:1};
                dataz.get_sql_cache(db,DT_ITEM,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    top_list=data_list;
                    call();
                });
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    top_list[a].items=[];
                    top_list[a].photos=[];
                }
                call();
            },
            function(call){
                sql = {parent_data_type:DT_BLOG_POST};
                sort={order:1};
                dataz.get_sql_cache(db,DT_ITEM,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    other_list=data_list;
                    call();
                });
            },
            function(call){
                for(a=0;a<other_list.length;a++){
                    other_list[a].items=[];
                    other_list[a].photos=[];
                }
                call();
            },
            function(call){
                for(a=0;a<full_photo_list.length;a++){
                    if(blog_post.tbl_id==full_photo_list[a].parent_tbl_id){
                        blog_post.photos.push(full_photo_list[a]);
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    for(b=0;b<full_photo_list.length;b++){
                        if(top_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            top_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<other_list.length;a++){
                    for(b=0;b<full_photo_list.length;b++){
                        if(other_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            other_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    for(b=0;b<other_list.length;b++){
                        if(top_list[a].tbl_id==other_list[b].parent_tbl_id){
                            for(c=0;c<other_list.length;c++){
                                if(other_list[b].tbl_id==other_list[c].parent_tbl_id){
                                    for(d=0;d<other_list.length;d++){
                                        if(other_list[c].tbl_id==other_list[d].parent_tbl_id){
                                            other_list[c][other_list[d].title_url]=other_list[d];
                                            other_list[c].items.push(other_list[d]);
                                        }
                                    }
                                    other_list[b][other_list[c].title_url]=other_list[c];
                                    other_list[b].items.push(other_list[c]);
                                }
                            }
                            top_list[a][other_list[b].title_url]=other_list[b];
                            top_list[a].items.push(other_list[b]);
                        }
                    }
                    blog_post[top_list[a].title_url]=top_list[a];
                    blog_post.items.push(top_list[a]);
                }
                call();
            },
        ],
            function(err, result){
                callback(error,blog_post);
            });
    }
    module.get_product=function(db,title_url,callback){
        var product=appz.get_new_item(DT_PRODUCT,0);
        var full_photo_list=[];
        var other_list=[];
        async.series([
            function(call){
                sql = {title_url:title_url};
                sort={};
                dataz.get_sql_cache(db,DT_PRODUCT,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    if(data_list.length>0){
                        if(data_list[0].tbl_id!=0 &&data_list[0]){
                            product=data_list[0];
                        }
                    }
                    product.money_price=utilityz.get_money(product.price);
                    product.photos=[];
                    product.items=[];
                    call();
                });
            },
            function(call){
                sql = {};
                sort={};
                dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    for(a=0;a<data_list.length;a++){
                        full_photo_list.push(data_list[a]);
                    }
                    call();
                });
            },
            function(call){
                sql={parent_tbl_id:product.tbl_id};
                sort={order:1};
                dataz.get_sql_cache(db,DT_ITEM,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    top_list=data_list;
                    call();
                });
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    top_list[a]=top_list[a];
                    top_list[a].items=[];
                    top_list[a].photos=[];
                }
                call();
            },
            function(call){
                sql = {parent_data_type:DT_PRODUCT};
                sort={order:1};
                dataz.get_sql_cache(db,DT_ITEM,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    other_list=data_list;
                    call();
                });
            },
            function(call){
                for(a=0;a<other_list.length;a++){
                    other_list[a]=other_list[a];
                    other_list[a].items=[];
                    other_list[a].photos=[];
                }
                call();
            },
            function(call){
                for(a=0;a<full_photo_list.length;a++){
                    if(product.tbl_id==full_photo_list[a].parent_tbl_id){
                        product.photos.push(full_photo_list[a]);
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    for(b=0;b<full_photo_list.length;b++){
                        if(top_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            top_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<other_list.length;a++){
                    for(b=0;b<full_photo_list.length;b++){
                        if(other_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            other_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    for(b=0;b<other_list.length;b++){
                        if(top_list[a].tbl_id==other_list[b].parent_tbl_id){
                            for(c=0;c<other_list.length;c++){
                                if(other_list[b].tbl_id==other_list[c].parent_tbl_id){
                                    for(d=0;d<other_list.length;d++){
                                        if(other_list[c].tbl_id==other_list[d].parent_tbl_id){
                                            other_list[c][other_list[d].title_url]=other_list[d];
                                            other_list[c].items.push(other_list[d]);
                                        }
                                    }
                                    other_list[b][other_list[c].title_url]=other_list[c];
                                    other_list[b].items.push(other_list[c]);
                                }
                            }
                            top_list[a][other_list[b].title_url]=other_list[b];
                            top_list[a].items.push(other_list[b]);
                        }
                    }
                    product[top_list[a].title_url]=top_list[a];
                    product.items.push(top_list[a]);
                }
                call();
            },
        ],
            function(err, result){
                callback(error,product);
            });
    }
    //setting
    //
    //setting.filter_category
    //setting.filter_search
    //setting.count
    //
    //paging
    //
    //setting.page_size
    //setting.page_current
    //
    //paging_return
    //
    //	paging_return=dt_total;
    //	paging_return=page_page_total;
    module.get_sub_page=function(db,page_title_url,sub_page_title_url,setting,callback){
        var item_map=appz.get_new_item(DT_ITEM_MAP,0);
        var sub_page=appz.get_new_item(DT_BLANK,0);
        sub_page.title_url=sub_page_title_url;
        var dt_total=0;
        var page_page_total=0;
        var full_photo_list=[];
        var top_list=[];
        var other_list=[];
        var error=null;
        async.series([
            function(call){
                sql = {title_url:page_title_url};
                sort={};
                dataz.get_sql_cache(db,DT_ITEM_MAP,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    if(data_list.length>0){
                        item_map=data_list[0];
                    }
                    item_map.photos=[];
                    item_map.items=[];
                    call();
                });
            },
            function(call){
                if(item_map.tbl_id!=0){
                    sql = {title_url:sub_page_title_url};
                    sort={};
                    dataz.get_sql_cache(db,item_map.title_url,sql,sort,function(error,data_list) {
                        if(error){
                            error=error;
                        }
                        if(data_list.length>0){
                            sub_page=data_list[0];
                        }
                        sub_page.photos=[];
                        sub_page.items=[];
                        call();
                    });
                }else{
                    call();
                }
            },
            function(call){
                if(item_map.tbl_id!=0&&sub_page.tbl_id!=0){
                    sql = {item_map_tbl_id:item_map.tbl_id};
                    sort={};
                    dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                        if(error){
                            error=error;
                        }
                        for(a=0;a<data_list.length;a++){
                            full_photo_list.push(data_list[a]);
                        }
                        call();
                    });
                }else{
                    call();
                }
            },
            function(call){
                if(item_map.tbl_id!=0&&sub_page.tbl_id!=0){
                    sort=appz.get_key_sort_type(sub_page);
                    if(!setting.filter_category){
                        sql={parent_tbl_id:sub_page.tbl_id};
                    }else{
                        sql={parent_tbl_id:sub_page.tbl_id,category:setting.filter_category};
                    }
                    if(setting.filter_search){
                        sql.search=setting.filter_search;
                    }
                    if(setting.count){
                        dataz.get_sql_paging_cache(db,item_map.title_url,sql,sort,1,setting.count,function(error,data_list,_dt_total,_page_page_total) {
                            if(error){
                                error=error;
                            }
                            top_list=data_list;
                            dt_total=_dt_total;
                            page_page_total=_page_page_total;
                            call();
                        });
                    }else if(setting.page_size){
                        if(!setting.page_current){
                            setting.page_current=1;
                        }
                        dataz.get_sql_paging_cache(db,item_map.title_url,sql,sort,setting.page_current,setting.page_size,function(error,data_list,_dt_total,_page_page_total) {
                            if(error){
                                error=error;
                            }
                            top_list=data_list;
                            dt_total=_dt_total;
                            page_page_total=_page_page_total;
                            call();
                        });
                    }else{
                        dataz.get_sql_cache(db,item_map.title_url,sql,sort,function(error,data_list) {
                            if(error){
                                error=error;
                            }
                            if(data_list.length>0){
                                top_list=data_list;
                                call();
                            }else{
                                call()
                            }
                        });
                    }
                }else{
                    call();
                }
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    top_list[a].items=[];
                    top_list[a].photos=[];
                }
                call();
            },
            function(call){
                if(item_map.tbl_id!=0&&sub_page.tbl_id!=0){
                    sql = {};
                    sort=appz.get_key_sort_type(sub_page);
                    dataz.get_sql_cache(db,item_map.title_url,sql,sort,function(error,data_list) {
                        if(error){
                            error=error;
                        }
                        other_list=data_list;
                        call();
                    });
                }
                else{
                    call();
                }
            },
            function(call){
                for(a=0;a<other_list.length;a++){
                    other_list[a].items=[];
                    other_list[a].photos=[];
                }
                call();
            },
            function(call){
                for(a=0;a<full_photo_list.length;a++){
                    if(sub_page.tbl_id==full_photo_list[a].parent_tbl_id){
                        sub_page.photos.push(full_photo_list[a]);
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    for(b=0;b<full_photo_list.length;b++){
                        if(top_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            top_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<other_list.length;a++){
                    for(b=0;b<full_photo_list.length;b++){
                        if(other_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            other_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    for(b=0;b<other_list.length;b++){
                        if(top_list[a].tbl_id==other_list[b].parent_tbl_id){
                            for(c=0;c<other_list.length;c++){
                                if(other_list[b].tbl_id==other_list[c].parent_tbl_id){
                                    for(d=0;d<other_list.length;d++){
                                        if(other_list[c].tbl_id==other_list[d].parent_tbl_id){
                                            other_list[c][other_list[d].title_url]=other_list[d];
                                            other_list[c].items.push(other_list[d]);
                                        }
                                    }
                                    other_list[b][other_list[c].title_url]=other_list[c];
                                    other_list[b].items.push(other_list[c]);
                                }
                            }
                            top_list[a][other_list[b].title_url]=other_list[b];
                            top_list[a].items.push(other_list[b]);
                        }
                    }
                    sub_page[top_list[a].title_url]=top_list[a];
                    sub_page['dt_total']=dt_total;
                    sub_page['page_page_total']=page_page_total;
                    sub_page.items.push(top_list[a]);
                }
                call();
            },
            function(call){
                sub_page.items=appz.get_item_list_sort(sub_page,sub_page.items);
                call();
            },
            function(call){
                async.forEachOf(sub_page.items,(top_item,key,go)=>{
                    top_item.items=appz.get_item_list_sort(top_item,top_item.items);
                    async.forEachOf(top_item.items,(sub_item,key,go2)=>{
                        sub_item.items=appz.get_item_list_sort(sub_item,sub_item.items);
                        async.forEachOf(sub_page.items,(item,key,go3)=>{
                            item.items=appz.get_item_list_sort(item,item.items);
                            go3();
                        }, error => {
                            if(error){
                                error=error;
                            }
                            go2();
                        });
                    }, error => {
                        if(error){
                            error=error;
                        }
                        go();
                    });
                }, error => {
                    if(error){
                        error=error;
                    }
                    call();
                });
            },
        ],
            function(err, result){
                callback(error,sub_page);
            });
    }
    module.get_item_list_sort=function(_item,_list){
        if(_item.setting_sort_type=='date'){
            sort_type='full_date_create';
        }else if(_item.setting_sort_type=='order'){
            sort_type='order';
        }else{
            sort_type='title';
        }
        if(_item.setting_sort_order=='asc'){
            sort_order=true;
        }else{
            sort_order=false;
        }

        if(sort_type=='order'){
            for(a=0;a<_list.length;a++){
                _list[a].order=parseInt(_list[a].order);
            }
        }
        arraySort(_list,sort_type,{reverse:sort_order});
        return _list;
    }
    module.get_order_status=function(status_id,callback) {
        switch(status_id) {
            case '0':
                return  'Open';
            case '1':
                return 'Paid';
                break;
            case '2':
                return 'Canceled';
                break;
            default:
                return 'Open';
        }

    }
    module.get_order=function(db,order_id,callback) {
        var error=null;
        var order = biz9.get_new_item(DT_ORDER,0);
        async.series([
            function(call){
                sql={id:order_id};
                dataz.get_sql_cache(db,DT_ORDER,sql,{},function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    if(data_list.length>0){
                        order=data_list[0];
                    }
                    call();
                });
            },
            function(call){
                sql={order_id:order_id};
                dataz.get_sql_cache(db,DT_ORDER_ITEM,sql,{},function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    order.cart={};
                    order.cart=caculate_cart(data_list);
                    call();
                });
            },
        ],
            function(err, result){
                callback(error,order);
            });
    }
    module.get_cart=function(db,sql,callback) {
        var error=null;
        var cart_list=[];
        async.series([
            function(call){
                dataz.get_sql_cache(db,DT_CART_ITEM,sql,{},function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    cart=caculate_cart(data_list);
                    call();
                });
            },
        ],
            function(err, result){
                callback(error,cart);
            });
    }
    module.set_cart=function(item_list,callback) {
        callback(0,caculate_cart(item_list));
    }
    caculate_cart=function(cart_list){
        sub_total=0;
        grand_total=0;
        shipping_total=0;
        quantity=0;
        for(a=0;a<cart_list.length;a++){
            cart_list[a] = set_cart_item(cart_list[a]);
            sub_total = (parseFloat(sub_total+cart_list[a].item_sub_total));
            shipping_total = (parseFloat(shipping_total+cart_list[a].item_shipping_total));
            grand_total = (parseFloat(grand_total+cart_list[a].item_grand_total));
            quantity = quantity+parseInt(cart_list[a].item_quantity);
        }
        cart={item_list:cart_list,
            price:{sub_total:biz9.get_money(sub_total),
                grand_total:biz9.get_money(grand_total),
                shipping_total: biz9.get_money(shipping_total),
                quantity:quantity,
                cents:biz9.get_cents(grand_total),
                cart_item_count:cart_list.length
            }
        };
        return cart;
    }
    module.get_cart_item_list=function(db,sql,callback) {
        var cart_list=[];
        var error=null;
        async.series([
            function(call){
                dataz.get_sql_cache(db,DT_CART_ITEM,sql,{},function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    cart_list=data_list;
                    call();
                });
            },
            function(call){
                for(a=0;a<cart_list.length;a++){
                    cart_list[a]=set_cart_item(cart_list[a]);
                }
                call();
            },
        ],
            function(err, result){
                callback(error,caculate_cart(cart_list));
            });
    }
    function set_cart_item(cart_item){

        if(isNaN(cart_item.item_shipping_price)){
            cart_item.item_shipping_price=0;
        }

        if(isNaN(cart_item.item_shipping_title)){
            cart_item.item_shipping_title='Standard';
        }

        if(isNaN(cart_item.item_price)){
            cart_item.item_price=0;
        }
        if(isNaN(cart_item.item_quantity)){
            cart_item.item_quantity=1;
        }
        if(!cart_item.customer_id){
            cart_item.customer_id=0;
            cart_item.customer_is_guest=true;
        }
        cart_item.item_sub_total=0;
        cart_item.item_shipping_total=0;
        cart_item.item_grand_total=0;
        if(cart_item.item_price){
            cart_item.item_sub_total=(parseFloat(cart_item.item_price)*parseFloat(cart_item.item_quantity));
        }
        if(cart_item.item_shipping_price){
            cart_item.item_shipping_total=(parseFloat(cart_item.item_shipping_price)*parseFloat(cart_item.item_quantity));
        }
        cart_item.item_grand_total= (parseFloat(cart_item.item_sub_total) +parseFloat(cart_item.item_shipping_total));
        cart_item.customer=
            {
                customer_id:cart_item.customer_id,
                is_guest:cart_item.customer_is_guest,
            }
        cart_item.item=
            {
                tbl_id:cart_item.item_tbl_id,
                title:cart_item.item_title,
                data_type:cart_item.item_data_type,
                price:cart_item.item_price,
                sub_note:cart_item.item_sub_note,
                category:cart_item.item_category,
                title_url:cart_item.item_title_url,
                quantity:cart_item.item_quantity,
                sub_total:biz9.get_money(cart_item.item_sub_total),
                shipping_total:biz9.get_money(cart_item.item_shipping_total),
                grand_total:biz9.get_money(cart_item.item_grand_total)
            }
        cart_item.shipping=
            {
                title:cart_item.item_shipping_title,
                price:biz9.get_money(cart_item.item_shipping_price),
            }
        return cart_item;
    }
    module.get_event_list=function(db,sql,sort_by,page_current,page_size,callback) {
        var event_list=[];
        var full_photo_list=[];
        var error=null;
        async.series([
            function(call){
                dataz.get_sql_paging_cache(db,DT_EVENT,sql,sort_by,page_current,page_size,function(error,data_list,_dt_total,_page_page_total) {
                    if(error){
                        error=error;
                    }
                    event_list=data_list;
                    dt_total=_dt_total;
                    page_page_total=_page_page_total;
                    call();
                });
            },
            function(call){
                sql = {};
                sort={};
                dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    full_photo_list=data_list;
                    call();
                });
            },
            function(call){
                for(a=0;a<event_list.length;a++){
                    event_list[a].photos=[];
                    event_list[a].date_full= biz9.get_date_full(event_list[a].start_date);
                    event_list[a].time_full= biz9.get_time_full(event_list[a].start_time);
                    for(b=0;b<full_photo_list.length;b++){
                        if(event_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            event_list[a].photos.push(full_photo_list[b]);
                            break;
                        }
                    }
                }
                call();
            },
        ],
            function(err, result){
                callback(error,event_list,dt_total,page_page_total);
            });
    }
    module.get_event=function(db,title_url,callback){
        var event=appz.get_new_item(DT_EVENT,0);
        var full_photo_list=[];
        var other_list=[];
        var error=null;
        async.series([
            function(call){
                sql = {title_url:title_url};
                sort={};
                dataz.get_sql_cache(db,DT_EVENT,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    if(data_list.length>0){
                        if(data_list[0].tbl_id!=0 &&data_list[0]){
                            event=data_list[0];
                        }
                    }
                    event.photos=[];
                    call();
                });
            },
            function(call){
                sql = {parent_tbl_id:event.tbl_id};
                sort={};
                dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    for(a=0;a<data_list.length;a++){
                        event.photos.push(data_list[a]);
                    }
                    call();
                });
            },
        ],
            function(err, result){
                callback(error,event);
            });
    }
    module.get_product_list=function(db,sql,sort_by,page_current,page_size,callback) {
        var product_list=[];
        var full_photo_list=[];
        var sub_product_list=[];
        var error=null;
        async.series([
            function(call){
                dataz.get_sql_paging_cache(db,DT_PRODUCT,sql,sort_by,page_current,page_size,function(error,data_list,_dt_total,_page_page_total) {
                    if(error){
                        error=error;
                    }
                    product_list=data_list;
                    dt_total=_dt_total;
                    page_page_total=_page_page_total;
                    call();
                });
            },
            function(call){
                sql = {parent_data_type:DT_PRODUCT};
                sort={};
                dataz.get_sql_cache(db,DT_ITEM,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    sub_product_list=data_list;
                    call();
                });
            },
            function(call){
                sql = {};
                sort={};
                dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    full_photo_list=data_list;
                    call();
                });
            },
            function(call){
                for(a=0;a<product_list.length;a++){
                    product_list[a].photos=[];
                    product_list[a].items=[];
                    product_list[a].money_price=utilityz.get_money(product_list[a].price);

                    for(b=0;b<full_photo_list.length;b++){
                        if(product_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            product_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<sub_product_list.length;a++){
                    sub_product_list[a].photos=[];
                    sub_product_list[a].items=[];
                    for(b=0;b<full_photo_list.length;b++){
                        if(sub_product_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            sub_product_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<product_list.length;a++){
                    for(b=0;b<sub_product_list.length;b++){
                        if(product_list[a].tbl_id==sub_product_list[b].parent_tbl_id){
                            for(c=0;c<sub_product_list.length;c++){
                                if(sub_product_list[b].tbl_id==sub_product_list[c].parent_tbl_id){
                                    for(d=0;d<sub_product_list.length;d++){
                                        if(sub_product_list[c].tbl_id==sub_product_list[d].parent_tbl_id){
                                            sub_product_list[c][sub_product_list[d].title_url]=sub_product_list[d];
                                            sub_product_list[c].items.push(sub_product_list[d]);
                                        }
                                    }
                                    sub_product_list[b][sub_product_list[c].title_url]=sub_product_list[c];
                                    sub_product_list[b].items.push(sub_product_list[c]);
                                }
                            }
                            product_list[a][sub_product_list[b].title_url]=sub_product_list[b];
                            product_list[a].items.push(sub_product_list[b]);
                        }
                    }
                }
                call();
            },
        ],
            function(err, result){
                callback(error,product_list,dt_total,page_page_total);
            });
    }
    module.get_service=function(db,title_url,callback){
        var service=appz.get_new_item(DT_SERVICE,0);
        var full_photo_list=[];
        var other_list=[];
        async.series([
            function(call){
                sql = {title_url:title_url};
                sort={};
                dataz.get_sql_cache(db,DT_SERVICE,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    if(data_list.length>0){
                        if(data_list[0].tbl_id!=0 &&data_list[0]){
                            service=data_list[0];
                        }
                    }
                    service.money_price=utilityz.get_money(service.price);
                    service.photos=[];
                    service.items=[];
                    call();
                });
            },
            function(call){
                sql = {};
                sort={};
                dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    for(a=0;a<data_list.length;a++){
                        full_photo_list.push(data_list[a]);
                    }
                    call();
                });
            },
            function(call){
                sql={parent_tbl_id:service.tbl_id};
                sort={order:1};
                dataz.get_sql_cache(db,DT_ITEM,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    top_list=data_list;
                    call();
                });
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    top_list[a]=top_list[a];
                    top_list[a].items=[];
                    top_list[a].photos=[];
                }
                call();
            },
            function(call){
                sql = {parent_data_type:DT_SERVICE};
                sort={order:1};
                dataz.get_sql_cache(db,DT_ITEM,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    other_list=data_list;
                    call();
                });
            },
            function(call){
                for(a=0;a<other_list.length;a++){
                    other_list[a]=other_list[a];
                    other_list[a].items=[];
                    other_list[a].photos=[];
                }
                call();
            },
            function(call){
                for(a=0;a<full_photo_list.length;a++){
                    if(service.tbl_id==full_photo_list[a].parent_tbl_id){
                        service.photos.push(full_photo_list[a]);
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    for(b=0;b<full_photo_list.length;b++){
                        if(top_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            top_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<other_list.length;a++){
                    for(b=0;b<full_photo_list.length;b++){
                        if(other_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            other_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    for(b=0;b<other_list.length;b++){
                        if(top_list[a].tbl_id==other_list[b].parent_tbl_id){
                            for(c=0;c<other_list.length;c++){
                                if(other_list[b].tbl_id==other_list[c].parent_tbl_id){
                                    for(d=0;d<other_list.length;d++){
                                        if(other_list[c].tbl_id==other_list[d].parent_tbl_id){
                                            other_list[c][other_list[d].title_url]=other_list[d];
                                            other_list[c].items.push(other_list[d]);
                                        }
                                    }
                                    other_list[b][other_list[c].title_url]=other_list[c];
                                    other_list[b].items.push(other_list[c]);
                                }
                            }
                            top_list[a][other_list[b].title_url]=other_list[b];
                            top_list[a].items.push(other_list[b]);
                        }
                    }
                    service[top_list[a].title_url]=top_list[a];
                    service.items.push(top_list[a]);
                }
                call();
            },
        ],
            function(err, result){
                callback(error,service);
            });
    }
    module.get_comment_list=function(db,sql,sort_by,page_current,page_size,callback) {
        var comment_list=[];
        var error=null;
        async.series([
            function(call){
                dataz.get_sql_paging_cache(db,DT_COMMENT,sql,sort_by,page_current,page_size,function(error,data_list,_dt_total,_page_page_total) {
                    if(error){
                        error=error;
                    }
                    comment_list=data_list;
                    dt_total=_dt_total;
                    page_page_total=_page_page_total;
                    call();
                });
            },
        ],
            function(err, result){
                callback(error,comment_list,dt_total,page_page_total);
            });
    }
    module.get_service_list=function(db,sql,sort_by,page_current,page_size,callback) {
        var service_list=[];
        var full_photo_list=[];
        var sub_service_list=[];
        var error=null;
        async.series([
            function(call){
                dataz.get_sql_paging_cache(db,DT_SERVICE,sql,sort_by,page_current,page_size,function(error,data_list,_dt_total,_page_page_total) {
                    if(error){
                        error=error;
                    }
                    service_list=data_list;
                    dt_total=_dt_total;
                    page_page_total=_page_page_total;
                    call();
                });
            },
            function(call){
                sql = {parent_data_type:DT_SERVICE};
                sort={};
                dataz.get_sql_cache(db,DT_ITEM,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    sub_service_list=data_list;
                    call();
                });
            },
            function(call){
                sql = {};
                sort={};
                dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    full_photo_list=data_list;
                    call();
                });
            },
            function(call){
                for(a=0;a<service_list.length;a++){
                    service_list[a].photos=[];
                    service_list[a].items=[];
                    for(b=0;b<full_photo_list.length;b++){
                        if(service_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            service_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<sub_service_list.length;a++){
                    sub_service_list[a].photos=[];
                    sub_service_list[a].items=[];
                    for(b=0;b<full_photo_list.length;b++){
                        if(sub_service_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            sub_service_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<service_list.length;a++){
                    for(b=0;b<sub_service_list.length;b++){
                        if(service_list[a].tbl_id==sub_service_list[b].parent_tbl_id){
                            for(c=0;c<sub_service_list.length;c++){
                                if(sub_service_list[b].tbl_id==sub_service_list[c].parent_tbl_id){
                                    for(d=0;d<sub_service_list.length;d++){
                                        if(sub_service_list[c].tbl_id==sub_service_list[d].parent_tbl_id){
                                            sub_service_list[c][sub_service_list[d].title_url]=sub_service_list[d];
                                            sub_service_list[c].items.push(sub_service_list[d]);
                                        }
                                    }
                                    sub_service_list[b][sub_service_list[c].title_url]=sub_service_list[c];
                                    sub_service_list[b].items.push(sub_service_list[c]);
                                }
                            }
                            service_list[a][sub_service_list[b].title_url]=sub_service_list[b];
                            service_list[a].items.push(sub_service_list[b]);
                        }
                    }
                }
                call();
            },
        ],
            function(err, result){
                callback(error,service_list,dt_total,page_page_total);
            });
    }
    module.get_project=function(db,title_url,callback){
        var project=appz.get_new_item(DT_PROJECT,0);
        var full_photo_list=[];
        var other_list=[];
        var error=null;
        async.series([
            function(call){
                sql = {title_url:title_url};
                sort={};
                dataz.get_sql_cache(db,DT_PROJECT,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    if(data_list.length>0){
                        if(data_list[0].tbl_id!=0 &&data_list[0]){
                            project=data_list[0];
                        }
                    }
                    project.money_price=utilityz.get_money(project.price);
                    project.photos=[];
                    project.items=[];
                    call();
                });
            },
            function(call){
                sql = {};
                sort={};
                dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    for(a=0;a<data_list.length;a++){
                        full_photo_list.push(data_list[a]);
                    }
                    call();
                });
            },
            function(call){
                sql={parent_tbl_id:project.tbl_id};
                sort={order:1};
                dataz.get_sql_cache(db,DT_ITEM,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    top_list=data_list;
                    call();
                });
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    top_list[a]=top_list[a];
                    top_list[a].items=[];
                    top_list[a].photos=[];
                }
                call();
            },
            function(call){
                sql = {parent_data_type:DT_PROJECT};
                sort={order:1};
                dataz.get_sql_cache(db,DT_ITEM,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    other_list=data_list;
                    call();
                });
            },
            function(call){
                for(a=0;a<other_list.length;a++){
                    other_list[a]=other_list[a];
                    other_list[a].items=[];
                    other_list[a].photos=[];
                }
                call();
            },
            function(call){
                for(a=0;a<full_photo_list.length;a++){
                    if(project.tbl_id==full_photo_list[a].parent_tbl_id){
                        project.photos.push(full_photo_list[a]);
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    for(b=0;b<full_photo_list.length;b++){
                        if(top_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            top_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<other_list.length;a++){
                    for(b=0;b<full_photo_list.length;b++){
                        if(other_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                            other_list[a].photos.push(full_photo_list[b]);
                        }
                    }
                }
                call();
            },
            function(call){
                for(a=0;a<top_list.length;a++){
                    for(b=0;b<other_list.length;b++){
                        if(top_list[a].tbl_id==other_list[b].parent_tbl_id){
                            for(c=0;c<other_list.length;c++){
                                if(other_list[b].tbl_id==other_list[c].parent_tbl_id){
                                    for(d=0;d<other_list.length;d++){
                                        if(other_list[c].tbl_id==other_list[d].parent_tbl_id){
                                            other_list[c][other_list[d].title_url]=other_list[d];
                                            other_list[c].items.push(other_list[d]);
                                        }
                                    }
                                    other_list[b][other_list[c].title_url]=other_list[c];
                                    other_list[b].items.push(other_list[c]);
                                }
                            }
                            top_list[a][other_list[b].title_url]=other_list[b];
                            top_list[a].items.push(other_list[b]);
                        }
                    }
                    project[top_list[a].title_url]=top_list[a];
                    project.items.push(top_list[a]);
                }
                call();
            },
        ],
            function(err, result){
                callback(error,project);
            });
    }
module.get_project_list=function(db,sql,sort_by,page_current,page_size,callback) {
    var project_list=[];
    var full_photo_list=[];
    var sub_project_list=[];
    var error=null;
    async.series([
        function(call){
            dataz.get_sql_paging_cache(db,DT_PROJECT,sql,sort_by,page_current,page_size,function(error,data_list,_dt_total,_page_page_total) {
                if(error){
                    error=error;
                }
                project_list=data_list;
                dt_total=_dt_total;
                page_page_total=_page_page_total;
                call();
            });
        },
        function(call){
            sql = {};
            sort={};
            dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                if(error){
                    error=error;
                }
                full_photo_list=data_list;
                call();
            });
        },
        function(call){
            for(a=0;a<project_list.length;a++){
                project_list[a].photos=[];
                project_list[a].items=[];
                for(b=0;b<full_photo_list.length;b++){
                    if(project_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                        project_list[a].photos.push(full_photo_list[b]);
                    }
                }
            }
            call();
        },
    ],
        function(err, result){
            callback(error,project_list,dt_total,page_page_total);
        });
}
module.get_gallery=function(db,title_url,callback){
    var gallery=appz.get_new_item(DT_GALLERY,0);
    var full_photo_list=[];
    var error=null;
    async.series([
        function(call){
            sql = {title_url:title_url};
            sort={};
            dataz.get_sql_cache(db,DT_GALLERY,sql,sort,function(error,data_list) {
                if(error){
                    error=error;
                }
                if(data_list.length>0){
                    if(data_list[0].tbl_id!=0 &&data_list[0]){
                        gallery=data_list[0];
                    }
                }
                gallery.photos=[];
                call();
            });
        },
        function(call){
            sql = {parent_tbl_id:gallery.tbl_id};
            sort={};
            dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                if(error){
                    error=error;
                }
                for(a=0;a<data_list.length;a++){
                    gallery.photos.push(data_list[a]);
                }
                call();
            });
        },
    ],
        function(err, result){
            callback(error,gallery);
        });
}
module.get_gallery_list=function(db,sql,sort_by,page_current,page_size,callback) {
    var gallery_list=[];
    var full_photo_list=[];
    var sub_gallery_list=[];
    var error=null;
    async.series([
        function(call){
            dataz.get_sql_paging_cache(db,DT_GALLERY,sql,sort_by,page_current,page_size,function(error,data_list,_dt_total,_page_page_total) {
                if(error){
                    error=error;
                }
                gallery_list=data_list;
                dt_total=_dt_total;
                page_page_total=_page_page_total;
                call();
            });
        },
        function(call){
            sql = {};
            sort={};
            dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                if(error){
                    error=error;
                }
                full_photo_list=data_list;
                call();
            });
        },
        function(call){
            for(a=0;a<gallery_list.length;a++){
                gallery_list[a].photos=[];
                gallery_list[a].items=[];
                for(b=0;b<full_photo_list.length;b++){
                    if(gallery_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                        gallery_list[a].photos.push(full_photo_list[b]);
                    }
                }
            }
            call();
        },
    ],
        function(err, result){
            callback(error,gallery_list,dt_total,page_page_total);
        });
}
module.get_page=function(db,title_url,setting,callback){
    var item_map=appz.get_new_item(DT_ITEM_MAP,0);
    var full_photo_list=[];
    var top_list=[];
    var other_list=[];
    var r_item_map=[];
    var error=null;
    async.series([
        function(call){
            sql = {title_url:title_url};
            sort={};
            dataz.get_sql_cache(db,DT_ITEM_MAP,sql,sort,function(error,data_list) {
                if(error){
                    error=error;
                }
                if(data_list.length>0){
                    if(data_list[0].tbl_id!=0 &&data_list[0]){
                        item_map=data_list[0];
                    }
                }else{
                    item_map.title_url=title_url;
                }
                item_map.photos=[];
                item_map.items=[];
                call();
            });
        },
        function(call){
            sql = {item_map_tbl_id:item_map.tbl_id};
            sort={};
            dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                if(error){
                    error=error;
                }
                for(a=0;a<data_list.length;a++){
                    full_photo_list.push(data_list[a]);
                }
                call();
            });
        },
        function(call){
            sql={parent_tbl_id:item_map.tbl_id};
            sort={order:1};
            if(setting.count){
                dataz.get_sql_paging_cache(db,item_map.title_url,sql,sort,1,setting.count,function(error,data_list,dt_total,page_page_total) {
                    if(error){
                        error=error;
                    }
                    top_list=data_list;
                    call();
                });
            }else{
                dataz.get_sql_cache(db,item_map.title_url,sql,sort,function(error,data_list) {
                    if(error){
                        error=error;
                    }
                    top_list=data_list;
                    call();
                });
            }
        },
        function(call){
            for(a=0;a<top_list.length;a++){
                top_list[a].items=[];
                top_list[a].photos=[];
            }
            call();
        },
        function(call){
            sql = {};
            sort={order:1};
            dataz.get_sql_cache(db,item_map.title_url,sql,sort,function(error,data_list) {
                if(error){
                    error=error;
                }
                other_list=data_list;
                call();
            });
        },
        function(call){
            for(a=0;a<other_list.length;a++){
                other_list[a].items=[];
                other_list[a].photos=[];
            }
            call();
        },
        function(call){
            for(a=0;a<full_photo_list.length;a++){
                if(item_map.tbl_id==full_photo_list[a].parent_tbl_id){
                    item_map.photos.push(full_photo_list[a]);
                }
            }
            call();
        },
        function(call){
            for(a=0;a<top_list.length;a++){
                for(b=0;b<full_photo_list.length;b++){
                    if(top_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                        top_list[a].photos.push(full_photo_list[b]);
                    }
                }
            }
            call();
        },
        function(call){
            for(a=0;a<other_list.length;a++){
                for(b=0;b<full_photo_list.length;b++){
                    if(other_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                        other_list[a].photos.push(full_photo_list[b]);
                    }
                }
            }
            call();
        },
        function(call){
            for(a=0;a<top_list.length;a++){
                for(b=0;b<other_list.length;b++){
                    if(top_list[a].tbl_id==other_list[b].parent_tbl_id){
                        for(c=0;c<other_list.length;c++){
                            if(other_list[b].tbl_id==other_list[c].parent_tbl_id){
                                for(d=0;d<other_list.length;d++){
                                    if(other_list[c].tbl_id==other_list[d].parent_tbl_id){
                                        other_list[c][other_list[d].title_url]=other_list[d];
                                        other_list[c].items.push(other_list[d]);
                                    }
                                }
                                other_list[b][other_list[c].title_url]=other_list[c];
                                other_list[b].items.push(other_list[c]);
                            }
                        }
                        top_list[a][other_list[b].title_url]=other_list[b];
                        top_list[a].items.push(other_list[b]);
                    }
                }
                item_map[top_list[a].title_url]=top_list[a];
                item_map.items.push(top_list[a]);
            }
            call();
        },
        function(call){
            item_map.items=appz.get_item_list_sort(item_map,item_map.items);;
            call();
        },
        function(call){
            async.forEachOf(item_map.items,(top_item,key,go)=>{
                top_item.items=appz.get_item_list_sort(top_item,top_item.items);
                async.forEachOf(top_item.items,(sub_item,key,go2)=>{
                    sub_item.items=appz.get_item_list_sort(sub_item,sub_item.items);
                    async.forEachOf(sub_item.items,(item,key,go3)=>{
                        item.items=appz.get_item_list_sort(item,item.items);
                        go3();
                    }, error => {
                        if(error){
                            error=error;
                        }
                        go2();
                    });
                }, error => {
                    if(error){
                        error=error;
                    }
                    go();
                });
            }, error => {
                if(error){
                    error=error;
                }
                call();
            });
        },
    ],
        function(err, result){
            callback(error,item_map);
        });
}
module.copy_photo_list=function(db,parent_tbl_id,new_parent_tbl_id,callback) {
    var photo_list=[];
    var copy_photo_list=[];
    var error=null;
    async.series([
        function(call){
            sql={parent_tbl_id:parent_tbl_id};
            dataz.get_sql_cache(db,DT_PHOTO,sql,{},function(error,data_list) {
                if(error){
                    error=error;
                }
                photo_list=data_list;
                call();
            });
        },
        function(call){
            for(a=0;a<photo_list.length;a++){
                photo=appz.get_new_item(DT_PHOTO,0);
                photo.parent_tbl_id=new_parent_tbl_id;
                photo.photofilename=photo_list[a].photofilename;
                photo.text=photo_list[a].text;
                copy_photo_list.push(photo);
            }
            call();
        },
        function(call){
            dataz.update_list(db,copy_photo_list,function(error,data_list) {
                copy_photo_list=data_list;
                if(error){
                    error=error;
                }
                call();
            });
        },
    ],
        function(err, result){
            callback(error,copy_photo_list);
        });
}
module.get_page_list=function(db,sql,sort_by,page_current,page_size,callback) {
    var page_list=[];
    var full_photo_list=[];
    var sub_page_list=[];
    var error=null;
    async.series([
        function(call){
            dataz.get_sql_paging_cache(db,DT_PAGE,sql,sort_by,page_current,page_size,function(error,data_list,_dt_total,_page_page_total) {
                if(error){
                    error=error;
                }
                page_list=data_list;
                dt_total=_dt_total;
                page_page_total=_page_page_total;
                call();
            });
        },
        function(call){
            sql = {};
            sort={};
            dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                if(error){
                    error=error;
                }
                full_photo_list=data_list;
                call();
            });
        },
        function(call){
            for(a=0;a<page_list.length;a++){
                page_list[a].photos=[];
                page_list[a].items=[];
                for(b=0;b<full_photo_list.length;b++){
                    if(page_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                        page_list[a].photos.push(full_photo_list[b]);
                    }
                }
            }
            call();
        },
    ],
        function(err, result){
            callback(error,page_list,dt_total,page_page_total);
        });
}

module.get_team_member=function(db,title_url,callback){
    var team_member=appz.get_new_item(DT_TEAM,0);
    var other_list=[];
    var error=null;
    async.series([
        function(call){
            sql = {title_url:title_url};
            sort={};
            dataz.get_sql_cache(db,DT_TEAM,sql,sort,function(error,data_list) {
                if(error){
                    error=error;
                }
                if(data_list.length>0){
                    if(data_list[0].tbl_id!=0 &&data_list[0]){
                        team_member=data_list[0];
                    }
                }
                call();
            });
        },
    ],
        function(err, result){
            callback(error,team_member);
        });
}
module.get_teamz=function(db,sql,sort_by,page_current,page_size,callback) {
    var team_list=[];
    var error=null;
    async.series([
        function(call){
            dataz.get_sql_paging_cache(db,DT_TEAM,sql,sort_by,page_current,page_size,function(error,data_list,_dt_total,_page_page_total) {
                if(error){
                    error=error;
                }
                team_list=data_list;
                dt_total=_dt_total;
                page_page_total=_page_page_total;
                call();
            });
        },
    ],
        function(err, result){
            callback(error,team_list,dt_total,page_page_total);
        });
}
module.get_blog_post_list=function(db,sql,sort_by,page_current,page_size,callback) {
    var blog_post_list=[];
    var full_photo_list=[];
    var sub_blog_post_list=[];
    var error=null;
    async.series([
        function(call){
            dataz.get_sql_paging_cache(db,DT_BLOG_POST,sql,sort_by,page_current,page_size,function(error,data_list,_dt_total,_page_page_total) {
                if(error){
                    error=error;
                }
                blog_post_list=data_list;
                dt_total=_dt_total;
                page_page_total=_page_page_total;
                call();
            });
        },
        function(call){
            sql = {parent_data_type:DT_BLOG_POST};
            sort={};
            dataz.get_sql_cache(db,DT_ITEM,sql,sort,function(error,data_list) {
                if(error){
                    error=error;
                }
                sub_blog_post_list=data_list;
                call();
            });
        },
        function(call){
            sql = {};
            sort={};
            dataz.get_sql_cache(db,DT_PHOTO,sql,sort,function(error,data_list) {
                if(error){
                    error=error;
                }
                full_photo_list=data_list;
                call();
            });
        },
        function(call){
            for(a=0;a<blog_post_list.length;a++){
                blog_post_list[a].photos=[];
                blog_post_list[a].items=[];
                for(b=0;b<full_photo_list.length;b++){
                    if(blog_post_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                        blog_post_list[a].photos.push(full_photo_list[b]);
                    }
                }
            }
            call();
        },
        function(call){
            for(a=0;a<sub_blog_post_list.length;a++){
                sub_blog_post_list[a].photos=[];
                sub_blog_post_list[a].items=[];
                for(b=0;b<full_photo_list.length;b++){
                    if(sub_blog_post_list[a].tbl_id==full_photo_list[b].parent_tbl_id){
                        sub_blog_post_list[a].photos.push(full_photo_list[b]);
                    }
                }
            }
            call();
        },
        function(call){
            for(a=0;a<blog_post_list.length;a++){
                for(b=0;b<sub_blog_post_list.length;b++){
                    if(blog_post_list[a].tbl_id==sub_blog_post_list[b].parent_tbl_id){
                        for(c=0;c<sub_blog_post_list.length;c++){
                            if(sub_blog_post_list[b].tbl_id==sub_blog_post_list[c].parent_tbl_id){
                                for(d=0;d<sub_blog_post_list.length;d++){
                                    if(sub_blog_post_list[c].tbl_id==sub_blog_post_list[d].parent_tbl_id){
                                        sub_blog_post_list[c][sub_blog_post_list[d].title_url]=sub_blog_post_list[d];
                                        sub_blog_post_list[c].items.push(sub_blog_post_list[d]);
                                    }
                                }
                                sub_blog_post_list[b][sub_blog_post_list[c].title_url]=sub_blog_post_list[c];
                                sub_blog_post_list[b].items.push(sub_blog_post_list[c]);
                            }
                        }
                        blog_post_list[a][sub_blog_post_list[b].title_url]=sub_blog_post_list[b];
                        blog_post_list[a].items.push(sub_blog_post_list[b]);
                    }
                }
            }
            call();
        },
    ],
        function(err, result){
            callback(error,blog_post_list,dt_total,page_page_total);
        });
}
return module;
}
