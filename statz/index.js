/*
Copyright 2023 Certified CoderZ
Author: certifiedcoderz@gmail.com (Certified CoderZ)
License GNU General Public License v3.0
Description: BiZ9 Framework: Core-StatZ
*/
module.exports = function(){
    // item = {item_data_type,item_tbl_id,customer_id,type_id}
    STAT_VIEW_ID='1';
    STAT_LIKE_ID='2';
    STAT_POST_ID='3';
    module.get_customer_item_like_list=function(customer_like_list,item_list,callback){
        for(var a=0;a<customer_like_list.length;a++){
            for(var b=0;b<item_list.length;b++){
                if(customer_like_list[a].item_tbl_id==item_list[b].tbl_id){
                    item_list[b].customer_like='true';
                }
            }
        }
            callback(null,item_list);
    }
    module.update_item_view_count=function(db,item_data_type,item_tbl_id,customer_id,callback){
        var new_view=true;
        var item_count=0;
        var update_item = biz9.get_new_item(item_data_type,item_tbl_id);
        var new_stat = biz9.get_new_item(DT_STAT,0);
        var error=null;
        async.series([
            function(call){
                if(customer_id){
                    sql = {customer_id:customer_id,item_tbl_id:item_tbl_id,type_id:STAT_VIEW_ID};
                    sort={};
                    dataz.get_sql_cache(db,DT_STAT,sql,sort,function(error,data_list) {
                        if(data_list.length>0){
                            new_view=false;
                        }
                        call();
                    });
                }else{
                    call();
                }
            },
            function(call){
                if(new_view){
                    new_stat.item_data_type=item_data_type;
                    new_stat.item_tbl_id=item_tbl_id;
                    new_stat.customer_id=customer_id;
                    new_stat.type_id=STAT_VIEW_ID;
                    biz9.update_item(db,DT_STAT,new_stat,function(error,data) {
                        call();
                    });
                }else{
                    call();
                }
            },
            function(call){
                if(new_view){
                    sql={type_id:STAT_VIEW_ID,item_tbl_id:item_tbl_id};
                    biz9.count(db,DT_STAT,sql,function(error,data) {
                        if(!data){
                            item_count=0;
                        }else if(data==STAT_VIEW_ID){
                            item_count=0;//bug fix
                        }else{
                            item_count=parseInt(data);
                        }
                        call();
                    });
                }else{
                    call();
                }
            },
            function(call){
                if(new_view){
                    update_item.view_count=parseInt(item_count)+1;
                    biz9.update_item(db,item_data_type,update_item,function(error,data) {
                        update_item=data;
                        call();
                    });
                }else{
                    call();
                }
            },
        ],
            function(err, result){
                update_item.new_view=new_view;
                callback(error,update_item);
            });
    }
    module.update_item_like_count=function(db,item_data_type,item_tbl_id,customer_id,callback){
        var new_like=true;
        var item_count=0;
        var update_item = biz9.get_new_item(item_data_type,item_tbl_id);
        var new_stat = biz9.get_new_item(DT_STAT,0);
        var error=null;
        async.series([
            function(call){
                if(customer_id){
                    sql = {customer_id:customer_id,item_tbl_id:item_tbl_id,type_id:STAT_LIKE_ID};
                    sort={};
                    dataz.get_sql_cache(db,DT_STAT,sql,sort,function(error,data_list) {
                        if(data_list.length>0){
                            new_like=false;
                        }
                        call();
                    });
                }else{
                    call();
                }
            },
            function(call){
                if(new_like){
                    new_stat.item_data_type=item_data_type;
                    new_stat.item_tbl_id=item_tbl_id;
                    new_stat.customer_id=customer_id;
                    new_stat.type_id=STAT_LIKE_ID;
                    biz9.update_item(db,DT_STAT,new_stat,function(error,data) {
                        call();
                    });
                }else{
                    call();
                }
            },
            function(call){
                if(new_like){
                    sql={type_id:STAT_LIKE_ID,item_tbl_id:item_tbl_id};
                    biz9.count(db,DT_STAT,sql,function(error,data) {
                        if(!data){
                            item_count=1;
                        }else{
                            item_count=parseInt(data);
                        }
                        call();
                    });
                }else{
                    item_count=1;
                    call();
                }
            },
            function(call){
                update_item.like_count=item_count;
                    biz9.update_item(db,item_data_type,update_item,function(error,data) {
                        update_item=data;
                        call();
                    });
            },
        ],
            function(err, result){
                update_item.new_like=new_like;
                callback(error,update_item);
            });
    }
        return module;
}
