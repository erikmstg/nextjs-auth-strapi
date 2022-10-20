module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'next_auth'),
      user: env('DATABASE_USERNAME', 'nextjs'),
      password: env('DATABASE_PASSWORD', 'nextjs'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
