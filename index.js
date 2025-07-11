import express from 'express'
import { searchController, usernameController } from './controller.js'
import router from './route.js'

const app = express()

const PORT = 3000

// define

app.get('/', (req,res)=>{
    res.send('Hello, Express')
})

app.use('/user', router)
app.use('/search',router)
// app.get('/about', (req,res)=>{
//     res.send('This is a about Route')
// })
// app.get('/contact', (req,res)=>{
//     res.send('This is a Contact Route')
// })

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})