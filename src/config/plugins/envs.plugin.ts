import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT:                 env.get('PORT').required().asPortNumber(),
    MAILER_SERVICE:       env.get('MAILER_SERVICE').required().asString() ,
    MAILER_MAIL:          env.get('MAILER_MAIL').required().asEmailString() ,
    MAILER_SECRET_KEY:    env.get('MAILER_SECRET_KEY').required().asString() ,
    GOOGLE_URL:           env.get('GOOGLE_URL').required().asUrlString() ,
    LOCALHOST_JSONDB_URL: env.get('LOCALHOST_JSONDB_URL').required().asUrlString() ,
    PROD:                 env.get('PROD').required().asBool(),
    
}