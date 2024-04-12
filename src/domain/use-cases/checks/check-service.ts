
interface CheckServiceUseCase{
    execute( url: string ): Promise<boolean>;
}

type SuccesCallback = () => void;
type ErrorCallback  = ( error: string, date: Date) => void;


export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly successCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback,
    ){}

    async execute( url: string): Promise<boolean>{

        try{
            const req = await fetch( url );
            
            if(!req.ok) {
                throw new Error(`Error on check service ${ url }`)
            }
            this.successCallback();
            return true; 
        }catch(error){
            const date = new Date();
            this.errorCallback(`${error}`, date);
            return false
        }
    }
}