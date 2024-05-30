import express from "express";

const app = express();

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send(`Server is serving....`)
})

// not time to server jokes
app.get('/api/jokes', (req, res) => {
    const jokes = [{
        id: 1,
        title: 'A Title',
        content: 'This is a joke',
    }, {
        id: 2,
        title: 'Another Title',
        content: 'This is another joke',
    }, {
        id: 3,
        title: 'Third Title',
        content: 'This is third joke',
    }, {
        id: 4,
        title: 'Forth Title',
        content: 'This is forth joke',
    }, {
        id: 5,
        title: 'Fifth Title',
        content: 'This is fifth joke',
    }];
    res.send(jokes)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})