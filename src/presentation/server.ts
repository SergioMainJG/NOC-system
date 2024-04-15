import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

const emailService = new EmailService();


export class ServerApp {

    public static start(){
        console.log('Server started...');

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute([
        //     'serch.towner2015@gmail.com', 'al2223034493@azc.uam.mx', 'scienceiswork@outlook.com'
        // ])
        // emailService.sendEmailWithFileSystemLogs([
        // ])
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     (  ) => {
        //         const url = envs.GOOGLE_URL;
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${ url } is ok`),
        //             (error, date) =>  console.error(`${ url } had a ${ error }; at ${date} `),
        //             ).execute( url );
        //     }
        // );
        
        // CronService.createJob(
        //     '*/10 * * * * *',
        //     (  ) => {
        //         const url = envs.LOCALHOST_JSONDB_URL;
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             (error, date) => console.error(`${ url } had a ${ error }; at ${date} `)
        //         ).execute(url);
        //     }
        // );

        
    } 
}
