import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDb = async () => {
    try {
        await mongoose.connect(String(process.env.MONGO_URL))
            .then(res => console.log("DBGA ULANDIM !✅"))
            .catch(err => console.log("DBGA ULANA OLMADIM !❌"))
    } catch (error) {
        console.log(error)
    }
}

