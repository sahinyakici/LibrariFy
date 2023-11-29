import { Book } from './book';
import { ResponseModel } from './responseModel';

export interface BookResponseModel extends ResponseModel {
  data: Book[];
}
