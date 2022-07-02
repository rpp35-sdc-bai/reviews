const express = require('express');

const app = express()

const port = /* env.process.PORT || */ 3000;

// make sure you have accept application/json in your headers
// or else you will have no body in your requests
app.use(express.json())

app.use('/reviews', require('./routes/reviews'))
app.use('/utils', require('./routes/utils'))

app.listen(port, () => {
    console.log(`listening on ${port}`)
})