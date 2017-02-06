/**
 * Created by founder on 8/20/15.
 */
var mongoose=require('mongoose');
var  Schema=mongoose.Schema;
var LoginSchema=new Schema({
    _id:String,
    Username:String,
    Password:String
})
var login = mongoose.model('login',LoginSchema);
module.exports = login;