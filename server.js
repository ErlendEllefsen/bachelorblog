require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const Email = require('./models/email')
const articleRouter = require('./routes/articles')
const app = express()

// Connecting to DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

// Get all articles
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles })
})
app.use('/articles', articleRouter)

app.post('/email', async (req, res) => {
    const email = new Email({
        email: req.body.email
    })
    try {
        await email.save()
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

// Port
app.listen(process.env.PORT || 8000)