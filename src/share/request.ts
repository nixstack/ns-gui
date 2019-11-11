import fetch from 'node-fetch'

// function parseJSON(response: any) {
//   return response.json();
// }

// function checkStatus(response: any) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }

//   const error: any = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }

// const request = (url: string, options: object = {}) => fetch(url, options)
//   .then(checkStatus)
//   .then(parseJSON)
//   // .then(data => ({ data }))
//   .then(data => {
//     return data.data ? data : { data };
//   })
//   .catch(err => ({ err }));

// export {
//   request
// }

export class Request {
  private static parseJSON(response: any) {
    return response.json()
  }

  private static checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) {
      return response
    }

    const error: any = new Error(response.statusText)
    error.response = response
    throw error
  }

  static get<T>(url: string, options: object = {}): Promise<T> {
    return (
      fetch(url, options)
        .then(Request.checkStatus)
        .then(Request.parseJSON)
        // .then(data => ({ data }))
        .then(data => {
          return data.data ? data : { data }
        })
        .catch(err => ({ err }))
    )
  }
}
