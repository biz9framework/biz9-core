# BiZ9-Core
The BiZ9 Framework Core is a Node.js [NPM JavaScript Package](https://www.npmjs.com/). It is used within a Node.js application as an interface to handle popular business functions such as product processing, service booking, and ticket handling. The core is utilize within The [BiZ9-CMS](https://github.com/biz9framework/biz9-cms), [BiZ9-Service](https://github.com/biz9framework/biz9-service), [BiZ9-Website](https://github.com/biz9framework/biz9-website) which are all server side components. Its primary responsibilities are data access, photo manipulation, and business logic processing. The primary libraries are [MongoDB](https://www.mongodb.com/), [Redis](https://redis.io/), [Amazon Web Services](https://aws.amazon.com/), [Brevo Mail](https://www.brevo.com/features/email-marketing/) and [Stripe](https://www.npmjs.com/).


The Data Access consists of Node.js calls. These functions include primary functions that are standardised in business applications. The database is MongoDB which is a NoSql based framework. The objects are written to the Redis cache by {key/value}. This speeds up the data access tremendously. Some popular functions are:


* [get_client_db](#get_client_db)
* [get_item](#get_item)
* [get_sql](#get_sql)
* [get_sql_paging](#get_sql_paging)
* [update_item](#update_item)
* [update_list](#update_list)


Image handling plays a major part in any application. There are many different device sizes available and your applications photos must properly show on all those devices. The BiZ9-Code solves this problem by creating multiple sizes of each object. Every business object, rather it be a ‘Product’, ‘Service’, ‘Blog Post’, each is provided by photo_obj.

```
var product = {title:’My Product 1’, cost:’2.00’, };
product = biz9.update_item(product);
product.photo_obj: {
                album_url: aws_url, // full size
                thumb_url: aws_url, // x250
                mid_url: aws_url, // x720
                large_url: aws_url, // x1000
                square_thumb_url: aws_url, // x250 sq
                square_mid_url: aws_url,  // x720 sq
                square_large_url: aws_url // x1000 sq
        },
```




The BiZ9-Core also provides popular business functionality such as currency processing. For example, when a new product is process in the system its new populated object looks like:

```
var product = {title:’My Product 1’, cost:’50.00’, };
product = biz9.update_item(product);

product.money_obj: { price: '$25.00', old_price: '$50.00', discount: '50%' }, // money
product.review_obj: { customer_rating_avg: '0', review_list: [] } // customer ratings
```


## Table of Contents:

* [Function Calls](#biz_function_call)
* [Sample Code](#biz_sample_code)
* [About](#biz_about)
* [Creator](#biz_about)



## <a id="biz_function_call"></a>Function Calls
* [App](#biz_app_function_call)
* [Amazon Web Services](#biz_amazon_web_services_function_call)
* [Brevo](#biz_brevo_function_call)
* [Data](#biz_data_function_call)
* [Order](#biz_order_function_call)
* [Stripe](#biz_stripe_function_call)
* [Stat](#biz_stat_function_call)
* [Utility](#biz_utility_function_call)

## <a id="biz_data_function_call"></a>Data Function Call
*s [close_client_db](#close_client_db)
* [delete_item](#delete_item)
* [delete_sql](#delete_sql)
* [delete_list](#delete_list)
* [get_client_db](#get_client_db)
* [get_item](#get_item)
* [get_sql](#get_sql)
* [get_sql_paging](#get_sql_paging)
* [update_item](#update_item)
* [update_list](#update_list)

## <a id="biz_stripe_function_call"></a>Stripe Function Calls
* get_stripe_card_charge
* get_stripe_card_token
* get_stripe_redirect_url

## <a id="biz_amazon_web_services_function_call"></a>Amazon Web Services Function Calls
* get_bucket_data
* update_bucket
* update_bucket_file

## <a id="biz_stat_function_call"></a>Stat Function Calls
* update_item_view_count

## <a id="biz_app_function_call"></a>App Function Calls
* account_validate_password
* account_validate_email
* account_validate_user_name
* check_admin
* check_customer
* check_user
* convert_biz_item
* copy_top_item
* copy_photo_list
* del_user
* del_cookie
* get_new_item
* get_test_user
* get_test_item
* get_item_not_found
* get_user
* get_helper
* get_helper_user
* get_blog_post
* get_category_title_list
* get_category_biz_list
* get_galleryz
* get_gallery
* get_blog_postz
* get_blog_post
* get_categoryz
* get_category
* get_cookie
* get_event
* get_eventz
* get_event_visible_option_list
* get_item_biz_list
* get_item_biz_review
* get_item_map_page
* get_key_sort_type
* get_member
* get_memberz
* get_page
* get_product
* get_product_visible_option_list
* get_productz
* get_project
* get_projectz
* get_reviewz
* get_service
* get_servicez
* get_service_visible_option_list
* get_sub_page
* get_test_sub_note
* get_videoz
* set_biz_item
* save_cookie
* save_user
* set_item_data
* set_new_blog_post
* set_new_category
* set_new_event
* set_new_project
* set_new_product
* set_new_service
* set_new_sub_item

## <a id="biz_app_function_call"></a>Order Function Calls
* get_cart_itemz
* get_orderz

## <a id="biz_utility_function_call"></a>Utility Function Calls
* get_currency
* get_cents
* get_contains
* get_date_time_obj
* get_date_time_pretty
* get_date_time_str
* get_date_str
* get_file_buffer
* get_file_ext
* get_guid
* get_id
* get_ip_address
* get_iso_str_by_date_time
* get_mp3_duration
* get_money
* get_money_obj
* get_month_title_short
* get_month_title
* get_paging_list
* get_slug
* get_title_url
* get_time_str
* get_visible_event_obj
* get_visible_product_obj
* get_visible_service_obj
* o
* remove_html_str
* remove_money
* set_file_upload
* set_resize_photo_file
* set_resize_square_photo_file
* set_photo_file
* text_truncate
* validate_email

## Function Call Details
<!--
### Function
#### <a id="get_blank"></a>get_blank
```
Description:
    tbd;
Param:
    none
        type: none;
Return:
    error: error message;
        type: string;
    field_tbl_id:
        type: none;
Example:
    tbd;
    output:
        none;
```

-->
### Function
#### <a id="get_client_db"></a>get_client_db
```
Description:
    Creates an instance of the database connection;
Best Practice:
    This will connect an active connection if your db is running on server. Make sure to call close_client_db() when done. This will disconnect from db and dispose;
Param:
    none;
Return:
    error: error message;
        type: string;
    client_db: An instance of the database connection;
        type: An object instance of db;
Example:
    code:
        function(call){
            biz9.get_client_db(function(error,_client_db){
                client_db=_client_db;
                db = client_db.db('db_name');
                call();
            });
        },
    output:
        db{
        <ref *1> MongoClient {
            _events: [Object: null prototype] {},
            _eventsCount: 0,
            _maxListeners: undefined,
            mongoLogger: MongoLogger {
            error: [Function: bound log],
            warn: [Function: bound log],
            info: [Function: bound log],
            debug: [Function: bound log],
                trace: [Function: bound log],
                    componentSeverities: {
                        command: 'off',
                        topology: 'off',
                        serverSelection: 'off',
                        connection: 'off',
                        default: 'off'
                    },
            maxDocumentLength: 1000,
            logDestination: { write: [Function: write] }
        },
        ...plus more...
```
### Function
#### <a id="close_client_db"></a>close_client_db
```
Description:
    Dispose and disconnect an instance of the database connection;
Best Practice:
    Make sure to call close_client_db() at end of get_client_db() instance. To close db connection and dispose instance;
Param:
    none;
Return:
    error: error_message;
        type: string;
    client_db: An instance of the database connection;
        type: db_client_connection;
Example:
    code:
        function(call){
                biz9.close_client_db(client_db,function(error){
                    call();
                });
        };
```
### Function
#### <a id="update_item"></a>update_item
```
Description:
    Update a data item in the database. Update data item object;
Best practice:
    new item:
        new value: {tbl_id:guid,date_create:new Date(),date_update:new Date()};
    exsisting item:
        update value: {date_update:new Date()};
Param:
  database_connection: The database connection object;
        type: object;
  table_name: The name of the database table;
        type: string;
    data_item: The data item;
        type: object;
Return:
    error: error_message;
        type: string;
    data_item: Updated database data item.;
        type: object;
Example:
    code:
        function(call){
            var DT_BLOG_POST='blog_post_biz';
            var blog_post = biz9.get_new_item(DT_BLOG_POST,0);
            var blog_post_test = biz9.get_new_item(DT_BLOG_POST,0);
            biz9.update_item(db,DT_BLOG_POST,blog_post,function(error,data) {
               blog_post = data;
               call();
            });
        };
    output:
        blog_post: {
            data_type: 'blog_post_biz',
            tbl_id: '4e9a255f-756a-4828-adf0-e35333ffa87b',
            title: 'title_401',
            first_name: 'first_name_760',
            last_name: 'last_name_609',
            user_name: 'user_name_951',
            test_group_id: 71271,
            title_url: 'title_401',
            date_create: '2024-01-07T13:21:36.817Z',
            date_save: '2024-01-07T13:21:36.817Z',
            _id: new ObjectId("659aa5602630957546ef51a2"),
            photofilename: '',
            photo_obj: {
                album_url: '/images/no_image.png',
                thumb_url: '/images/no_image.png',
                mid_url: '/images/no_image.png',
                large_url: '/images/no_image.png',
                square_thumb_url: '/images/no_image.png',
                square_mid_url: '/images/no_image.png',
                square_large_url: '/images/no_image.png'
        },
            review_count: '0',
            view_count: '0',
            date_obj: {
                pretty_create: 'just now',
                pretty_update: 'just now',
                full_date_create: 'Sunday January 7th, 2024',
                full_date_update: 'Sunday January 7th, 2024',
                full_date_time_create: 'Sunday January 7th, 2024',
                full_date_time_update: 'Sunday January 7th, 2024',
                month_create: 'Jan',
                month_update: 'Jan',
                mo_create: 1,
                mo_update: 1,
                date_create: 7,
                year_create: 2024,
                year_update: 2024,
                time_create: '8:21 am',
                time_update: '8:21 am'
            }
        };
```
### Function
#### <a id="update_list"></a>update_list
```
Description:
    Update a list of data items in the database;;
Best Practice:
    Make sure data item field {data_type} is set;
    new item:
        new value: {tbl_id:guid,date_create:new Date(),date_update:new Date()};
    exsisting item:
        update value: {date_update:new Date()};
Param:
    database_connection: The database connection object;
        type: object;
    data_item_list: The list of data items;
        type: list;
Return:
    error: error_message;
        type: string;
    data_item_list: The list of database data items;
        type: list;
Example:
    function(call){
        var DT_BLOG_POST='blog_post_biz';
        var new_blog_post_list=[];
        var blog_post_list=[];
        var group_id=biz9.get_id();
        for(a=0;a<2;a++){
            var blog_post=biz9.get_test_item();
            blog_post.data_type=DT_BLOG_POST;
            blog_post.group_id=group_id;
            blog_post_list.push(blog_post);
        }
        biz9.update_list(db,blog_post_list,function(error,data_list) {
            new_blog_post_list=data_list;
            call();
        });
    };
    output:
        new_blog_post_list:
            [
                {
                    data_type: 'blog_post_biz',
                    tbl_id: '4816fa90-4c4a-4d90-be28-a3584c445eb3',
                    order: 77355,
                    title: 'title_77355',
                    sub_note: 'sub_note_77355',
                    test_group_id: 92152,
                    date_create: '2024-01-07T15:33:12.023Z',
                    date_save: '2024-01-07T15:33:12.023Z',
                    _id: new ObjectId("659ac4381c6c9b5840feae9a")
                },
                {
                    data_type: 'blog_post_biz',
                    tbl_id: 'be1fa2de-a9c4-46bb-9aa8-030e249df8b1',
                    order: 46365,
                    title: 'title_46365',
                    sub_note: 'sub_note_46365',
                    test_group_id: 92152,
                    date_create: '2024-01-07T15:33:12.023Z',
                    date_save: '2024-01-07T15:33:12.023Z',
                    _id: new ObjectId("659ac4381c6c9b5840feae9b")
                }
            ];
```
### Function
#### <a id="get_item"></a>get_item
```
Description:
    Get a data item from the database. Get by tbl_id;
Param:
    database_connection: The Database connection object;
        type: object;
    table_name: The name of the database table;
        type: string;
    tbl_id: The data item tbl_id;
        type: guid;
Return:
    error: error_message;
        type: string;
    data_item: The data item from database table;
        type: object;
Example:
    code:
        function(call){
            var DT_BLOG_POST='blog_post_biz';
            var tbl_id='a37cef10-7a89-407e-88a3-f13465b0ca5b';
            var blog_post = biz9.get_new_item(DT_BLOG_POST,tbl_id);
            biz9.get_item(db,DT_BLOG_POST,blog_post.tbl_id,function(error,data) {
                blog_post=data;
                call();
            });
        };
    output:
        blog_post=
            {
              _id: new ObjectId("659b16b5ee652587d16fb0ec"),
              data_type: 'blog_post_biz',
              tbl_id: '2b2747c4-17c4-4349-b8b4-3dd90a73f7e1',
              title: 'title_343',
              first_name: 'first_name_324',
              sub_note: 'sub_note_661',
              test_group_id: 48372,
              title_url: 'title_343',
              date_create: '2024-01-07T21:25:09.767Z',
              date_save: '2024-01-07T21:25:09.768Z',
              source: 'db',
              photofilename: '',
              photo_obj: {
                album_url: '/images/no_image.png',
                thumb_url: '/images/no_image.png',
                mid_url: '/images/no_image.png',
                large_url: '/images/no_image.png',
                square_thumb_url: '/images/no_image.png',
                square_mid_url: '/images/no_image.png',
                square_large_url: '/images/no_image.png'
              },
              review_count: '0',
              view_count: '0',
              date_obj: {
                pretty_create: '1 minute ago',
                pretty_update: '1 minute ago',
                full_date_create: 'Sunday January 7th, 2024',
                full_date_update: 'Sunday January 7th, 2024',
                full_date_time_create: 'Sunday January 7th, 2024',
                full_date_time_update: 'Sunday January 7th, 2024',
                month_create: 'Jan',
                month_update: 'Jan',
                mo_create: 1,
                mo_update: 1,
                date_create: 7,
                year_create: 2024,
                year_update: 2024,
                time_create: '4:25 pm',
                time_update: '4:25 pm'
              }
            };
}
```
### Function
#### <a id="get_sql"></a>get_sql
```
Description:
    Get a list of data items from database table. Get by sql;
Param:
    database_connection: The database connection object;
        type: object;
    table_name: The name of the database table;
        type: string;
    sql_query: The key value field query;
        type: object {key:value};
    sort_query: The key value field query to sort the list;
        type: object {key:value};
Return:
    error: error message;
        type: string;
    data_item_list: The data items from the table;
        type: list [{key:value},{key:value},{key:value}];
Example:
    code:
        function(call){
            var DT_BLOG_POST='blog_post_biz';
            var data_item_list = [];
            var sql = {title_url:'info'};
            var sort={date_create:-1};
            biz9.get_sql(db,DT_BLOG_POST,sql,sort,function(error,data_list) {
                data_item_list = data_list;
                call();
            });
        };
    output:
        data_item_list = [{
            _id: new ObjectId("659adb153342419e7b943f75"),
            data_type: 'blog_post_biz',
            tbl_id: 'bb5e8d42-9c05-4462-b5b8-8b09ae8d597b',
            order: 72349,
            title: 'title_72349',
            sub_note: 'sub_note_72349',
            test_group_id: 90138,
            date_create: '2024-01-07T17:10:45.050Z',
            date_save: '2024-01-07T17:10:45.050Z',
            source: 'db',
            photofilename: '',
            photo_obj: {
                album_url: '/images/no_image.png',
                thumb_url: '/images/no_image.png',
                mid_url: '/images/no_image.png',
                large_url: '/images/no_image.png',
                square_thumb_url: '/images/no_image.png',
                square_mid_url: '/images/no_image.png',
                square_large_url: '/images/no_image.png'
            },
            review_count: '0',
            view_count: '0',
            date_obj: {
                pretty_create: '19 seconds ago',
                pretty_update: '19 seconds ago',
                full_date_create: 'Sunday January 7th, 2024',
                full_date_update: 'Sunday January 7th, 2024',
                full_date_time_create: 'Sunday January 7th, 2024',
                full_date_time_update: 'Sunday January 7th, 2024',
                month_create: 'Jan',
                month_update: 'Jan',
                mo_create: 1,
                mo_update: 1,
                date_create: 7,
                year_create: 2024,
                year_update: 2024,
                time_create: '12:10 pm',
                time_update: '12:10 pm'
            }];
```
### Function
#### <a id="get_sql_paging"></a>get_sql_paging
```
Description:
    Get a paged list of data items from database table. Get page limit by sql;
Param:
    database_connection: The database connection object;
        type: object;
    table_name: The name of the database table;
        type: string;
    sql_query: The key value field query;
        type: object {key:value};
    sort_query: The key value field query to sort the list;
        type: object {key:value};
    page_current: The current page the list is on.
        default: 1;
    page_size: The count for how many list items to return.
        default: 1;
Return:
    error: error message;
        type: string;
    data_item_list: The data items from the table;
        type: list [ {key:value},{key:value},{key:value} ];
    total_item_count: The count of the data items.
Example:
    code:
        function(call){
            var blog_post_list = [];
            var total_item_count = 0;
            var page_count = 0;
            var DT_BLOG_POST='blog_post_biz';
            var sql = {title_url:'my_blog_post_1'};
            var sort={date_create:-1};
            var page_current = 1;
            var page_size = 12;
            biz9.get_sql_paging(db,DT_BLOG_POST,sql,sort,page_current,page_size,function(error,data_list,total_item_count,page_count){
                blog_post_list = data_list;
                total_item_count=total_item_count;
                page_count=page_count;
                    call();
                });
        };
    output:
        blog_post_list = {
            _id: new ObjectId("659adb153342419e7b943f75"),
            data_type: 'blog_post_biz',
            tbl_id: 'bb5e8d42-9c05-4462-b5b8-8b09ae8d597b',
            order: 72349,
            title: 'My Blog Post 1',
            title_url: 'my_blog_post_1',
            sub_note: 'sub_note_72349',
            test_group_id: 90138,
            date_create: '2024-01-07T17:10:45.050Z',
            date_save: '2024-01-07T17:10:45.050Z',
            source: 'db',
            photofilename: '',
            photo_obj: {
                album_url: '/images/no_image.png',
                thumb_url: '/images/no_image.png',
                mid_url: '/images/no_image.png',
                large_url: '/images/no_image.png',
                square_thumb_url: '/images/no_image.png',
                square_mid_url: '/images/no_image.png',
                square_large_url: '/images/no_image.png'
            },
            review_count: '0',
            view_count: '0',
            date_obj: {
                pretty_create: '19 seconds ago',
                pretty_update: '19 seconds ago',
                full_date_create: 'Sunday January 7th, 2024',
                full_date_update: 'Sunday January 7th, 2024',
                full_date_time_create: 'Sunday January 7th, 2024',
                full_date_time_update: 'Sunday January 7th, 2024',
                month_create: 'Jan',
                month_update: 'Jan',
                mo_create: 1,
                mo_update: 1,
                date_create: 7,
                year_create: 2024,
                year_update: 2024,
                time_create: '12:10 pm',
                time_update: '12:10 pm'
            }
```
### Function
#### <a id="delete_item"></a>delete_item
```
Description:
    Delete the data item from the database. Delete by tbl_id;
Param:
    database_connection: The database connection object;
        type: object;
    table_name: The name of the database table;
        type: string;
    tbl_id: The data item tbl_id;
        type: guid;
Return:
    error: error message;
        type: string;
    data_item: The data item from database table;
        type: object;
Example:
    code:
        function(call){
            var DT_BLOG_POST='blog_post_biz';
            var tbl_id='a37cef10-7a89-407e-88a3-f13465b0ca5b';
            var blog_post = biz9.get_new_item(DT_BLOG_POST,tbl_id);
            biz9.delete_item(db,helper.item.data_type,helper.item.tbl_id,function(error,data) {
                blog_post=data; //removed from database
            });
        },
    output:
        blog_post={
            data_type: 'blog_post_biz',
            tbl_id: 'a37cef10-7a89-407e-88a3-f13465b0ca5b',
            cache_string: 'blog_post_biz_aik_a37cef10-7a89-407e-88a3-f13465b0ca5b',
            cache_del: true,
            data_del: true,
            data: { acknowledged: true, deletedCount: 0 }
        }
```
### Function
#### <a id="delete_sql"></a>delete_sql
```
Description:
    Delete a list of data items from database. Delete by sql;
Param:
    none
        type: none;
Return:
    error: error message;
        type: string;
    data_item_list: The data items from the table;
        type: list [{key:value},{key:value},{key:value}];//deleted
Example:
    code:
        function(call){
            var DT_BLOG_POST='blog_post_biz';
            var data_item_list = [];
            var sql = {group_id:'123'};
            biz9.delete_sql(db,DT_BLOG_POST,sql,function(error,data_list) {
                data_item_list = data_list;
                call();
            });
        };
    output:
        []; //deleted

```
### Function
#### <a id="delete_item"></a>delete_item
```
Description:
    Delete a data item from the database. Delete by tbl_id;
Param:
    database_connection: The Database connection object;
        type: object;
    table_name: The name of the database table;
        type: string;
    tbl_id: The data item tbl_id;
        type: guid;
Return:
    error: error_message;
        type: string;
    data_item: The data item from database table;
        type: object;
Example:
    code:
        function(call){
            var DT_BLOG_POST='blog_post_biz';
            var tbl_id='a37cef10-7a89-407e-88a3-f13465b0ca5b';
            var blog_post = biz9.get_new_item(DT_BLOG_POST,tbl_id);
            biz9.delete_item(db,DT_BLOG_POST,blog_post.tbl_id,function(error,data) {
                blog_post=data;
                call();
            });
        };
    output:
        blog_post={
            data_type: 'blog_post_biz',
            tbl_id: 'a37cef10-7a89-407e-88a3-f13465b0ca5b',
            cache_string: 'blog_post_biz_aik_a37cef10-7a89-407e-88a3-f13465b0ca5b',
            cache_del: true,
            data_del: true,
            data: { acknowledged: true, deletedCount: 0
        }
```
### Function
#### <a id="delete_list"></a>delete_list
```
Description:
    Delete a list of data items from the database; Delete by tbl_id list.
Best Practice:
    Make sure data  list item field {data_type} is set;
Param:
    database_connection: The database connection object;
        type: object;
    table_name: The name of the database table;
        type: string;
    data_item_list: The list of data items to be removed from database.
        type: list {tbl_id:'123',data_type:table_name};
Return:
    error: error message;
        type: string;
    field_tbl_id:
        type: none;
Example:
    code:
        function(call){
            var DT_BLOG_POST='blog_post_biz';
            var data_item_list = [
            {tbl_id='123',data_type:DT_BLOG_POST},
            {tbl_id='1234',data_type:DT_BLOG_POST},
            {tbl_id='1235',data_type:DT_BLOG_POST},
            ];
            biz9.delete_list(db,DT_BLOG_POST,data_item_list,function(error,data_list) {
                data_item_list = data_list;
                call();
            });
        };
       output:
        none;
```


## <a id="biz_sample_code"></a>Sample Code
```
/* --- APP CONFIG  --- */
const PROJECT_ID="19";
const APP_TITLE_ID="sample_app_19";
const APP_TITLE="BiZ9 Sample App";
const APP_CLOUD_BUCKET="aws_bucket";

/* --- BIZ9 CONFIG --- */
const BIZ_MAP=true; // convert field titles field_1, field_2 with value_1, value_2 [default=true]

/* --- MONGO --- */
const MONGO_IP="localhost";
const MONGO_USERNAME_PASSWORD="";
const MONGO_PORT="27019";
const MONGO_SERVER_USER="admin";
const MONGO_CONFIG="/etc/mongod.conf";
const SSH_KEY=""; // used to restart remote server on mongo fail.

/* --- REDIS --- */
const REDIS_URL="0.0.0.0";
const REDIS_PORT="27019";

/* --- AWS --- */
const AWS_S3_SAVE=true;
const AWS_S3_BUCKET=APP_CLOUD_BUCKET;
const AWS_KEY="";
const AWS_SECRET="";
const AWS_REGION='us-east-2';

data_config={
    mongo_server_user:MONGO_SERVER_USER,
    mongo_username_password:MONGO_USERNAME_PASSWORD,
    mongo_ip:MONGO_IP,
    mongo_port:MONGO_PORT,
    mongo_config:MONGO_CONFIG,
    ssh_key:SSH_KEY,
    redis_url:REDIS_URL,
    redis_port:REDIS_PORT,
};
app_config={
    app_title_id:APP_TITLE_ID,
    app_version:APP_VERSION,
    app_title:APP_TITLE,
    project_id:PROJECT_ID,
    file_url:FILE_URL,
    biz_map:BIZ_MAP
}

biz9=require("biz9-core")(app_config,data_config);
```


## <a id="biz_about"></a>About

### The Core of The BiZ9 Framework
The BiZ9-Core library is the heart of the BiZ9 Framework. It is used within a Node.js application as an interface to handle popular business functions such as product processing, service booking, and ticket handling. You access the core library interface with pre defined data about the project, database settings, and 3rd party tool parameters. The data access utilizes memory caching to speed things up.

#### Required Libriaries
* [MongoDB](https://www.mongodb.com/)
* [Redis](https://redis.io/)
#### Other Libriaries
* [Amazon Web Service SDK](https://aws.amazon.com/developer/tools/)
* [Stripe](https://stripe.com/docs/api)
* [Brevo API](https://developers.brevo.com/)

### Fast Data Access
The core library handles data access for applications as well. Data is retrieved from cache instead of the database. This speeds up data processing tremendously. On data insert, each object is written to the database, and also added to memory using a unique key/value. To retrieve data, you would use that unique key and the object will be accessed via the system memory instead of the database. This approach speeds up data access of the application.

### Key Features
* CRUD Data Access
* Caching
* Business Logic
* Utilities
* Notifications
* File Processing
* Cloud Storage

## E-mail
- certifiedcoderz@gmail.com
## Code
- [BiZ9 Framework Github](https://github.com/biz9framework)
- [BiZ9 Core NPM](https://www.npmjs.com/package/biz9-core)
## Website
- [certifiedcoderz.com](https://certifiedcoderz.com)
## Support
- [$TaNK9Code](https://cash.app/$Tank9Code)

## The BiZ9 Framework 🦾

The BiZ9 Framework is a user-friendly platform for building fast and scalable network applications. The framework consists of libraries and software tools like: Node,js, ExpressJS, MongoDB, Nginx, Redis, GIT, and Bash. The BIZ9 Framework is designed to build, maintain, and deploy rich, robust, and data driven real-time applications for data driven web, Android and Apple devices. Other 3rd party Application Programming Interfaces that are pre included are Amazon Web Service, Stripe and Bravely.

- [What Is The BiZ9 Framework? ](https://medium.com/@tank9code/what-is-the-biz9-framework-ec67d123e505)
- [BoSS Mobile App Youtube Demo](https://youtu.be/W_ZUmwZMFoc?si=4b5_6q9vPgi1IxPL)

## TaNK9 Code 👽

Brandon Poole Sr also known as ‘TaNK’ is a full stack technical lead and application developer with 17 years of experience. He was born and raised in Atlanta, Ga and graduated with a Computer Information Systems degree from Fort Valley State University (FVSU). He is proficient in ASP.NET C#, ASP.NET MVC, .NET Core, Microsoft SQL Server, IIS Web Server, Node.js, Framework7, Redis, Amazon Web Services, Apple IOS, Android SDK, Redis, NGINX, GIT.
- [Tank9Code Blog](https://medium.com/@tank9code/about-brandon-poole-sr-ac2fe8e06a09)
- [9_OPZ Certified CoderZ Founder](https://certifiedcoderz.com)
- [BoSS AppZ Creator](https://bossappz.com)
- The Real Tank from the Matrix movie!

## LinkZ:
- [certifiedcoderz.com](certifiedcoderz.com)
- [instagram.com/tank9code](instagram.com/tank9code)
- [twitch.com/tank9code](twitch.com/tank9code)
- [twitter.com/tank9code](twitter.com/tank9code)
- [medium.com/@tank9code](medium.com/@tank9code)
- [blogpost.com/certifiedcoderz](blogpost.com/certifiedcoderz)
- [blogpost.com/tank9code](blogpost.com/tank9code)
- [tictok.com/tank9code](tictok.com/tank9code)
- [facebook.com/tank9code](facebook.com/tank9code)
## TagZ:
#### #BoSSAppZ
#### #BiZ9Framework
#### #EBook
#### #Mobile
#### #Apple
#### #Android
#### #IOS
#### #Linux
#### #AmazonWebServices
#### #AppMoneyNoteZ
#### #TaNKCode9
#### Thank you for your time.
####  Looking forward to working with you.


