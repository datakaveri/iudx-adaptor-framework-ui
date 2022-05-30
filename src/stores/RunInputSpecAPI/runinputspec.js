const axios = require('axios').default;

const baseURL= 'http://0.0.0.0:4010'

const getData=async ()=>{
await axios({
    method: 'post',
    url: `${baseURL}/onboard/run-input-spec`,
    headers: {}, 
    data: {
        
            "inputSpec": {
              "type": "http",
              "url": "https://rs.iudx.org.in/ngsi-ld/v1/entity/abc",
              "requestType": "GET",
              "pollingInterval": -1,
              "headers": {
                "content-type": "application/json"
              },
              "boundedJob": true,
              "minioConfig": {
                "url": "http://minio1:9000",
                "bucket": "custom-state",
                "stateName": "test-state-job",
                "accessKey": "minio",
                "secretKey": "minio123"
              }
            }
          
    }
  }).then(
    (response)=>{
        const responseJson=response
        console.log(response)
        return responseJson
    }
).catch(
    (error)=>{
        console.log(error)
    }
);
}
// console.log(responseJson)
export default getData;