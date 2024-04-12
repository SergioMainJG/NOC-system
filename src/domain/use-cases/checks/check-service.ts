import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase{
    execute( url: string ): Promise<boolean>;
}

type SuccesCallback = () => void;
type ErrorCallback  = ( error: string, date: Date) => void;


export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback,
    ){}

    async execute( url: string): Promise<boolean>{

        try{
            const req = await fetch( url );
            
            if(!req.ok) {
                throw new Error(`Error on check service ${ url }`)
            }
            const log = new LogEntity( LogSeverityLevel.low,`Service ${ url } working :)` );
            this.logRepository.saveLog( log )
            this.successCallback();
            return true; 
        }catch(error){
            const errorMessage = `${error}`;
            const date = new Date();
            const log = new LogEntity( LogSeverityLevel.high,`Service ${ url } working :)` );
            
            this.logRepository.saveLog( log );
            this.errorCallback(errorMessage, date);
            
            return false
        }
    }
}