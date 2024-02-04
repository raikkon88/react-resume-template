const axios = require('axios')

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async () => {
    const response = await axios.get(
        'https://msanxes-general-bucket.s3.amazonaws.com/resumeData.json'
    )
    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify(response.data),
    }
}
