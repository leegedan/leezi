
// export const builder = (data, message = '', code = 0, total = 0, headers = {}) => {
//     responseBody.data = data
//     if (message !== undefined && message !== null) {
//         responseBody.message = message
//     }
//     if (code !== undefined && code !== 0) {
//         responseBody.code = code
//         responseBody._status = 200
//     }
//     // if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
//     //   responseBody._headers = headers
//     // }

//     if (total !== undefined && total !== 0) {
//         responseBody.total = total
//     }
//     return responseBody
// }

export const getQueryParameters = (options: { url: any }) => {
    const url = options.url
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

export const getBody = (options: { body?: string }) => {
    return options.body && JSON.parse(options.body!)
}

export const copy = (len: number = 10, fun: Function) => {
    const data = []
    while (len--) {
        data.push(fun())
    }
    return data
}


export function genBody(data: any = null, code: number = 200, msg: string = 'success') {
    return {
        code,
        msg,
        data
    }
}
