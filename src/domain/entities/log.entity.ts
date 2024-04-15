export enum LogSeverityLevel {
    low    = 'low',
    medium = 'medium',
    high   = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt? : Date;
}

export class LogEntity{

    public message: string;
    public level: LogSeverityLevel;
    public origin: string;
    public createdAt: Date;
    
    constructor(options: LogEntityOptions){
        const {  message, level, origin, createdAt = new Date()} = options;
        this.level = level;
        this.message = message;
        this.origin = origin;
        this.createdAt = createdAt;
    }

    static fromJSON = ( json: string): LogEntity => {
        const { message, level, origin,createdAt} = JSON.parse( json );
        if ( !message ) throw new Error('Message is required!');
        
        const log = new LogEntity( { 
            message:   message, 
            level:     level, 
            origin:    origin, 
            createdAt: createdAt
        });
        return log;
    };

}