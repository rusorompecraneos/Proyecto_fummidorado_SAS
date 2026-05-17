import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host:    process.env.DB_HOST || 'localhost',
    port:    process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false // cambia a console.log si quieres ver las queries
  }
);

export const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a PostgreSQL con Sequelize');

    // Esto crea las tablas automáticamente si no existen
    // alter: true actualiza columnas si cambian los modelos
    await sequelize.sync({ alter: true });
    console.log('✅ Tablas sincronizadas correctamente');
  } catch (error) {
    console.error('❌ Error conectando a PostgreSQL:', error.message);
    process.exit(1);
  }
};

export default sequelize;