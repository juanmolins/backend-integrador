import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://rulomolins:jOQIS5NG1d1Cei13@cluster0.8dfub8y.mongodb.net/?retryWrites=true&w=majority', {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conectado a la base de datos');
});

export { mongoose, db };