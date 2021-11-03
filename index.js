const express = require('express')
const mongoose = require('mongoose')
const PORT = 3000
const app = express()
app.use(express.json())
const user = require('./routes/user')


mongoose.connect('mongodb://localhost:27017/bit_users' , {useNewUrlParser: true,useUnifiedTopology: true })
    .then(()=>{ console.log('Connected to db successfully'); })


app.use('/api/v1/user',user)


app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})