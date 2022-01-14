const express = require('express')
const app = express();

const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.get('*', (req, res, next) => {
    res.send("404 Page Not Found");
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}...`))