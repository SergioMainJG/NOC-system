import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)



export class ServerApp {

    public static start(){
        console.log('Server started...');
        CronService.createJob(
            '*/5 * * * * *',
            (  ) => {
                const url = 'https://www.google.com'
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${ url } is ok`),
                    (error, date) =>  console.error(`${ url } had a ${ error }; at ${date} `),
                    ).execute( url );
            }
        );
        
        CronService.createJob(
            '*/10 * * * * *',
            (  ) => {
                const url = 'http://localhost:3000/'
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is ok`),
                    (error, date) => console.error(`${ url } had a ${ error }; at ${date} `)
                ).execute(url);
            }
        );

        
    } 
}
