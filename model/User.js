/**
 * Created by founder on 8/14/15.
 */
var mongoose=require('mongoose');
var  Schema=mongoose.Schema;
var UserSchema=new Schema({
    _id: String,
    name:String,
    password:String,
    nickname:String,
    group_discussion:[{
        group_discussion_name:String,
        group_discussion_img:String,
        group_discussion_talk:[{
            content:{
                message:String,
                author:String
            }
        }]
    }],
    group_list:[{
        group_name:String,
        group_img:String
    }],
    contact_list:{
        catologue:[{
           list:String
        }],
        default:[{
            default_list: [{
                qq_number: String,
                nickname: String,
                remark: String,
                talk:[{
                    content:{
                        message:String,
                        qq_number:String
                    }
                }]
            }]
        }]
    }
})
var user = mongoose.model('user',UserSchema);
module.exports = user;
//exports.User = db.model('User', UserSchema);;