import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/** changes any object to form data.
Put 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' in headers
*/
export function toFormBody(details: any) {
    let formBody: any = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
}

export const cloudDb = {
    apikey: "2UUm4jwOJ3AudFqrZaaysOA6QOe",
    dbowner: "xDepcio",
    dbname: "dev.db",
    query: async (query: string) => {
        const res = await fetch('https://api.dbhub.io/v1/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: toFormBody({
                apikey: cloudDb.apikey,
                dbowner: cloudDb.dbowner,
                dbname: cloudDb.dbname,
                sql: btoa(query)
            })
        })
        const data = await res.json()
        return data
    },
    formatResponse: (data: any, replaceField?: { fieldName: string, newFieldName: string, replaceWith: (entry: any) => any }) => {
        const formattedData = data.map((item: any) => {
            // console.log(item)
            const formattedItem: any = item.reduce((acc: any, curr: any) => {
                let value = curr.Type === 4 ? Number(curr.Value) : curr.Value

                let name: string = curr.Name
                if (replaceField) {
                    if (curr.Name === replaceField.fieldName) {
                        name = replaceField.newFieldName
                        acc[name] = replaceField.replaceWith(curr)
                        return acc
                    }
                }

                acc[name] = value
                return acc
            }, {})
            return formattedItem
        })
        return formattedData
    }
}
