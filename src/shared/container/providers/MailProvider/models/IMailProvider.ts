import { ISendMailDTO } from '../dtos/ISendMailDTO';

interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<string>;
}

export { IMailProvider };
