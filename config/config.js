require('dotenv').config()

CONFIG={}

CONFIG.port = process.env.PORT;
CONFIG.db_name = process.env.DB_NAME;
CONFIG.db_host = process.env.DB_HOST;
CONFIG.db_user = process.env.DB_USER;
CONFIG.db_password = process.env.DB_PASSWORD;
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION;
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION;
CONFIG.secret_key = process.env.SECRET_KEY
CONFIG.user = process.env.USER;
CONFIG.pass = process.env.PASS;
CONFIG.db_dialect = process.env.DB_DIALECT;
