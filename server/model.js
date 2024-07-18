const mongoose=require('mongoose')

let Schema=mongoose.Schema
// schema

let myList= new Schema({
    notes:String,
    email:String
})
let list=mongoose.model('ToDo',myList)


// 
let  encryption= new Schema({
    email:String,
    username:String,
    password:String
})

let encry=mongoose.model('encryption',encryption)
module.exports={list,encry}