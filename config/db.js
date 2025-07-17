import mongoose from 'mongoose'

export const connectDb =  async () => {
   try {
        await mongoose.connect('mongodb+srv://manindersolitaire:mynameismaninder@cluster0.cbksfcf.mongodb.net/express')
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}