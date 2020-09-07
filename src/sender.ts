import requestPromise, { RequestPromise } from 'request-promise';
import ISender from './contracts/isender';
import cheerio from 'cheerio';

class Sender implements ISender
{
    private _send(method: string, url: string, data?: object): RequestPromise
    {
        let convertedData: Array<any> = data ? this._convertData(data): [];

        return requestPromise(url, {
            method: method,
            headers: {
                'content-type': 'multipart/form-data',
            },
            multipart: {
                chunked: false,
                data: convertedData
            },
            followAllRedirects: true,
            jar: true,
            transform: (body) => cheerio.load(body)
        });
    }

    private _convertData(data: object): Array<any>
    {
        let convertedData: Array<any> = [];
        
        for (const [key, value] of Object.entries(data)) {
            convertedData.push({
                'Content-Disposition': `form-data; name="${key}"`,
                body: value
            });
        }

        return convertedData;
    }

    public get(url: string): RequestPromise
    {
        return this._send('GET', url);
    }

    public post(url: string, data?: object): RequestPromise
    {
        return this._send('POST', url, data);
    }

    public put(url: string, data?: object): RequestPromise
    {
        return this._send('PUT', url, data);
    }

    public delete(url: string, data?: object): RequestPromise
    {
        return this._send('DELETE', url, data);
    }
}

export { Sender };