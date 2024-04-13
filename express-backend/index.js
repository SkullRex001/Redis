import express from 'express'
import { createClient } from 'redis'
const app = express()
const client = createClient()



app.use(express.json())



app.post('/submit',async (req, res) => {

    try {
        const { problemId, userId, code, language } = req.body

        await client.lPush("submission", JSON.stringify({ problemId, userId, code, language }))
        
        res.status(200).json({
            message : "Code successfully submitted"
        })

    } catch (error) {

        res.status(500).json({
            message : error.message
        })

        console.log({
            error : error.message,
            path : error.stack
        })

    }


})



const startServer = async () => {
    try {

        await client.connect()
        console.log("Connected tp Redis")

        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })

    } catch (error) {
        console.log({
            error: error.message
        })

    }
}

startServer()