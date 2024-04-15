import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions{
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachment[];
}

interface Attachment{
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_MAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor(
    ){}

    async sendEmail( options: SendEmailOptions): Promise<boolean>{
        
        const { to, subject, htmlBody, attachements = [] } = options;
        try{
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            });

            console.log( sendInformation );
            
            return true;
        }catch(error){
            
            return false;
        }
    }
    
    async sendEmailWithFileSystemLogs( to: string | string[], ): Promise<boolean> {
        const subject = 'Log del servidor';
        const htmlBody = `
                <h2> Logs de sistema NOC (: </h2>
                <p>Sit minim Lorem do ad quis enim. Et laborum eu deserunt proident. Ex aliqua aliquip velit dolore dolor qui sunt consectetur et. Labore aliqua amet minim aute ex excepteur eu consectetur. Irure laboris ullamco fugiat ipsum nulla dolor. Nostrud veniam eu aliqua commodo ex reprehenderit officia in non adipisicing anim.</p>
                <p>ver logs adjuntos</p>
        `;

        const attachements: Attachment[] = [
            { filename: 'log-all.log',    path: './logs/log-all.log'},
            { filename: 'log-medium.log', path: './logs/log-medium.log'},
            { filename: 'log-high.log',   path: './logs/log-high.log'},
        ];

        try{
            this.sendEmail({
                to, subject, htmlBody, attachements
            })

            return true;
        }catch(error){
            return false;
        }
    }

}