import express from 'express'
import { searchController, usernameController } from './controller.js'
import router from './route.js'
import multer from 'multer'

const storage =  multer.diskStorage({
    destination :'uploads',
    filename : (req,file,cb) => {
        cb(null,file.originalname)
    }
})

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

app.use(express.urlencoded({extended : true}))
app.use(upload.single('image'))
// set EJS as the view engine

// app.set('view engine', 'ejs')

// app.use('/public',express.static('public'))
// app.use('/images',express.static('images'))


app.use((req,res,next)=>{
      console.log('A new request received at'+Date.now())
      next()
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

// app.put('/users/:id',express.json() ,(req,res)=>{
//     const userId = req.params.id
//     const {name,email} = req.body

//     res.json({
//         msg : `User ${userId} updated ${name}, ${email}`
//     })

// })

// app.delete('/users/:id',express.json() ,(req,res)=>{
//         const userId = req.params.id
//         res.json({
//             msg : `User ${userId} deleted successfully`
//         })
// })

app.post('/form', (req,res)=>{
    console.log(req.body)
    console.log(req.file)

    res.send('Form Data Received..')
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})