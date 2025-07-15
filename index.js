import express from 'express'
import { searchController, usernameController } from './controller.js'
import router from './route.js'

const app = express()

const PORT = 3000

// define

app.use((req,res,next)=>{
      console.log('A new request received at'+Date.now())
      next()
})


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

app.post('/users',express.json() ,(req,res)=>{
    const {name, email} = req.body
    res.json({
        msg: `User ${name} with email ${email} created Successfully`
    })
})

app.put('/users/:id',express.json() ,(req,res)=>{
    const userId = req.params.id
    const {name,email} = req.body

    res.json({
        msg : `User ${userId} updated ${name}, ${email}`
    })

})

app.delete('/users/:id',express.json() ,(req,res)=>{
        const userId = req.params.id
        res.json({
            msg : `User ${userId} deleted successfully`
        })
})
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})