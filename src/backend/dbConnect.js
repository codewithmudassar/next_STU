import mongoose from 'mongoose'

const dbConnect = async () => {
    if(mongoose.connection.readyState >= 1){
        return
    }
    try {
      await mongoose.connect(process.env.MongoDb)
        console.log("db Connect")
    } catch (error) {
        console.error(error)
        return false
    }
}

export default dbConnect
