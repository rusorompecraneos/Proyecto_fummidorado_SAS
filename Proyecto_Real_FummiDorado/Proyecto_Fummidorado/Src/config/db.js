import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 5432,
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || '123456789',
  database: process.env.DB_NAME     || 'Fummi_Dorado_SAS_BD'
});

// Verificar conexión al arrancar
pool.connect()
  .then(client => {
    console.log('✅ Conectado a PostgreSQL correctamente');
    client.release();
  })
  .catch(err => {
    console.error('❌ Error conectando a PostgreSQL:', err.message);
  });

export default pool;