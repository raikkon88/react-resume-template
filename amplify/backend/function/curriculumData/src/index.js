const axios = require('axios');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const response = await axios.get('https://msanxes-general-bucket.s3.amazonaws.com/resumeData.json');
    console.log(`EVENT: ${JSON.stringify(response.data)}`);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify(response.data),
    };
};