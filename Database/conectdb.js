import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log('conectetd to MongoDB');
} catch (error) {
    console.log('Conexion error:'+ error);
}
