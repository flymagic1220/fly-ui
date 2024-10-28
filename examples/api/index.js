import { post} from './request' 
const appConfig = '/app-config'
export default class apiServer { 
    static queryDictionaryValueList = (params) => post(`${appConfig}/api/dictionary/queryDictionaryValueList`, params)
}
 