import {createClient} from 'redis'

const client = createClient()

const main = async ()=>{
    await client.connect()

    //worker will pole the queue

    while(1){
        const response = await client.brPop("submission" , 0)

    console.log(response)

    await new Promise((resolve)=>{
        setTimeout(resolve , 1000)
    })

    console.log("Processed user submission")

    }

    


}


main()
