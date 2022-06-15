const express = require('express');

const app = express()

const port = /* env.process.PORT || */ 3000;

// make sure you have accept application/json in your headers
// or else you will have no body in your requests
app.use(express.json())

app.use('/products', require('./routes/products'))
app.use('/questions', require('./routes/questions'))
app.use('/reviews', require('./routes/reviews'))

app.listen(port, () => {
    console.log(`listening on ${port}`)
})