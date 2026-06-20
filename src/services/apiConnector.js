import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector =(method, url, bodyData, headers, params) => {

  console.log(method);
  console.log(url);
  console.log(bodyData);
  console.log(headers);
  console.log(params);

  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};



// export const apiConnector = (method, url, bodyData = null, headers = null, params = null) => {
//   console.log(method);
//   console.log(url);
//   console.log(bodyData);
//   console.log(headers);
//   console.log(params);

//   const requestOptions = {
//     method: method,
//     headers: headers ? new Headers(headers) : undefined,
//     body: bodyData ? JSON.stringify(bodyData) : undefined
//   };

//   let fetchUrl = url;
//   if (params) {
//     const queryString = new URLSearchParams(params).toString();
//     fetchUrl += `?${queryString}`;
//   }

//   return fetch(fetchUrl, requestOptions)
//     .then(response => response.json())
//     .catch(error => console.error('Error:', error));
// };
  

