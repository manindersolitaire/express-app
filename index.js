import express from 'express'
import { searchController, usernameController } from './controller.js'
import router from './route.js'
import multer from 'multer'
import mongoose from 'mongoose'
import storage from './config/multer.js'
import { connectDb } from './config/db.js'
import Person from './models/Person.js'

const app = express()
const upload = multer(
    {
    storage,
    limits : {
        fileSize : 1024000
    }
}
)
const PORT = 3000

await connectDb()

app.use(express.urlencoded({extended : true}))
app.use(upload.single('image'))
// set EJS as the view engine

// app.set('view engine', 'ejs')

// app.use('/public',express.static('public'))
// app.use('/images',express.static('images'))


// app.use((req,res,next)=>{
//       console.log('A new request received at'+Date.now())
//       next()
// })
app.post('/person', express.json() , async (req,res)=>{
    console.log(req.body)
    const {email , name , age} = req.body;

    const newPerson = new Person({
        email,
        name,
        age
    })
    await newPerson.save()
    console.log(newPerson)
    res.json({
        msg : 'Person Added'
    })
     
})


app.get('/', (req,res)=>{
    const username =  'Maninder'
    res.render('index', {username})
})

app.use('/user', router)
app.use('/search',router)
// app.get('/about', (req,res)=>{
//     res.send('This is a about Route')
// })
// app.get('/contact', (req,res)=>{
//     res.send('This is a Contact Route')
// })

// app.post('/users',express.json() ,(req,res)=>{
//     const {name, email} = req.body
//     res.json({
//         msg: `User ${name} with email ${email} created Successfully`
//     })
// })

app.put('/person',express.json() ,async(req,res)=>{
   const { id } = req.body
    const personData =  await Person.findByIdAndUpdate(id, {
        age : 28
    })
    // personData.name = 'Maninder Singh'
    // await personData.save()
    console.log(personData)

    res.json({
        msg : 'Data fetched successfully',
    })

})

app.delete('/person/:id',express.json() ,(req,res)=>{
        const userId = req.params.id
        res.json({
            msg : `User ${userId} deleted successfully`
        })
})

// app.post('/form', (req,res)=>{
//     console.log(req.body)
//     console.log(req.file)

//     res.send('Form Data Received..')
// })

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})