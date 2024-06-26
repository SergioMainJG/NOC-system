import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs';

export class FileSystemDatasource implements LogDatasource{
    
    private readonly logPath        = 'logs/';
    private readonly allLogsPath    = 'logs/log-all.log';
    private readonly mediumLogsPath = 'logs/log-medium.log';
    private readonly highLogsPath   = 'logs/log-high.log';

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        
        if( !fs.existsSync( this.logPath ) )
            fs.mkdirSync( this.logPath, {recursive: true} );

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach( path => {
            if( fs.existsSync( path )) return;
            fs.writeFileSync( path, '' );
        });
    };

    async saveLog( newLog: LogEntity): Promise<void> {
        const logAsJSON = `${ JSON.stringify( newLog ) }\n`

        fs.appendFileSync( this.allLogsPath, logAsJSON);
        
        if( newLog.level === LogSeverityLevel.low ) return;
        
        if( newLog.level === LogSeverityLevel.medium )
            fs.appendFileSync( this.mediumLogsPath, logAsJSON);
        
        if( newLog.level === LogSeverityLevel.high )
            fs.appendFileSync( this.highLogsPath, logAsJSON);
    }

    private getLogsFromFile = ( path: string): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8');
        const logs = content.split('\n').map( LogEntity.fromJSON );
        return logs;
    };

    async getLogs( severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch( severityLevel ){
            case LogSeverityLevel.low:
                return this.getLogsFromFile( this.allLogsPath);

            case LogSeverityLevel.medium:
                return this.getLogsFromFile( this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile( this.highLogsPath);
            
            default:
                throw new Error(`${ severityLevel } not implemented!`);
        }

    }

}
