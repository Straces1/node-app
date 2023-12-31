require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const Book = require('./models/books')
const app = express()
const PORT = process.env.PORT || 3001

app.set('view engine', 'ejs')

mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

app.get('/', (req, res) => {
    res.render('index', {title: 'Books'})
})

app.get('/add-note', async (req, res) => {
    try {
        await Book.insertMany([
            {
                title: 'Sons of Anarchy',
                body: 'body text'
            },
            {
                title: 'Game of Thrones',
                body: 'body text'
            }
        ])
        res.send('Books added...')
    } catch (error) {
        console.log('err' + error)
    }
})

app.get('/books', async (req, res) => {
    const book = await Book.find()

    if(book) {
        res.render('books', {book})
    } else {
        res.send('something went wrong')
    }
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}) 


