import { Injectable } from '@angular/core';
import { NameValuePair } from '../../models/namevaluepair';

@Injectable()
export class QuerystringBuilderService {
    public createQuerystring(params: NameValuePair[]): string {
        if (params.length === 0) {
            return '';
        }

        let url = '?';
        let index = 0;
        for (let item of params) {
            if (item.value) {
                if (index > 0) {
                    url += "&";
                }
                url += params[index].name;
                url += '=';
                url += params[index].value;
                index++;
            }
        }
        return url;
    }
}