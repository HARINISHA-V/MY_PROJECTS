const express=require('express')
const  mongoose=require('mongoose')
const {list,encry}=require('./model')
// const encry =require('./model')
let bcrypt=require('bcrypt')
let jwt=require('jsonwebtoken')
let SECRETKEY='meow'
let app=express()
app.use(express.json())
const cors=require('cors')
app.use(cors())

let port=3100;
app.listen(port,()=>{
    console.log('server is running at port 3100')
})
// db connect
const databaseconnection=async()=>{
    try {
        let connection=await mongoose.connect('mongodb+srv://harinisha:atlas%402001@cluster0.dmzrn8v.mongodb.net/',{
            useUnifiedTopology:true
        })
    } catch (error) {
        console.log(error);
    }
}

databaseconnection()

let middlewarePoints=['/postdata','/passupdate','/getdata','/deldata','/updatedata']
// middleware
let middleware=(req,res,next)=>{
    // token
    try {
        let {authorization} = req.headers
        if(authorization){
            jwt.verify(authorization.split(' ')[1],SECRETKEY,(error)=>{
                if(error){
                    res.send({message:error,statuscode:401})
                return}
            })
        } else{
            res.send({message:'unauthorized',statuscode:401})
            return
        }
        next()
    } catch (error) {
        res.send(error)
    }

    
}
app.use(middlewarePoints,middleware)

// post call

app.post('/postdata',async(req,res,next)=>{
    try {
        let body=req.body
        let datas=new list(body)
        //    let datas=new list({notes:body.ipdata})
        let response=await datas.save()
        console.log("saved")
        res.send({data:response,message:'success',statuscode:200}).status(200)
    } catch (error) {
        console.log(error)
        res.send({message:'internal server error'}).status(500)
    }
})

// get call

app.get('/getdata/:email',async(req,res,next)=>{
    try {
        let email=req.params.email
        let items = await list.find({email});
        res.send({data:items,statuscode:200}).status(200)
    } catch (error) {
        console.log(error)
        res.send({message:'database -internal server error'}).status(500)
    }
})

// 

app.delete('/deldata/:id',async(req,res,next)=>{
    try {
        let id=req.params.id
        let result = await list.findByIdAndDelete(id)
        res.send({deleted:result,datmessage:"delete"}).status(201)
    
    } catch (error) {
        next(error)
    }
    })

app.put('/updatedata/:id',async(req,res,next)=>{
    try {
        let id=req.params.id
        let body = req.body
        let result = await list.findByIdAndUpdate(id, {notes:body.notes}, {new:true})
        res.send({status:result,datmessage:"updated"}).status(200)
    } catch (error) {
        console.log(error)
        next(error)
    }
})



app.post('/signup',async(req,res)=>{
        try {
            let {email,username,password}=req.body
            let jtoken=jwt.sign({email},SECRETKEY,{expiresIn:3600})
    let salt=await bcrypt.genSalt(10)
    let change= await bcrypt.hash(password,salt)
    let saved=new encry({email:email,username:username, password:change})
    let response = await saved.save()
    res.send({encrypt:response,statuscode:200,jtoken}).status(200)
    
        } catch (error) {
            console.log(error);
        }
    })

// "username":"harini",
// "password":"hello" 
app.post('/signin',async(req,res)=>{
    try {
        let{email,password}=req.body
        let jtoken=jwt.sign({email},SECRETKEY,{expiresIn:3600})
        let pas=await encry.find({email:email})
        let pwd=await bcrypt.compare(password,pas[0].password)
        res.send({pwd,jtoken,statuscode:200})
    } catch (error) {
        res.send(error)
     
        
    }
   
})

 // let saved=new encry({email:email, password:change})
app.put('/passupdate',async(req,res,next)=>{
    try {
        let {email,password}= req.body
        let salt=await bcrypt.genSalt(10)
        let change= await bcrypt.hash(password,salt)
        let result = await encry.findOneAndUpdate({email:email,password:change,new:true})
        res.send({status:result,datmessage:"updated password"}).status(200)
    } catch (error) {
        console.log(error)
        next(error)
    }
})






