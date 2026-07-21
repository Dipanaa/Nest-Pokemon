

// Se aconseja crear un readme.md que explique las variables de entorno

export const useConfigEnv = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    getLimit: process.env.GET_LIMIT || 5
})