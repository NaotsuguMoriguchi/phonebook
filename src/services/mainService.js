import { httpService } from './httpService';


export const getIncomingCallInfo = ({ area, city, number }) =>
{
  return httpService.get(`chakushin/${area}/${city}/${number}`);

}