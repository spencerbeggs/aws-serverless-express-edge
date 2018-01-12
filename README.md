Run serverless applications on the edge in Amazon CloudFront using Lambda@Edge.  
This is especially useful for deporting the intensive task of server rendering SPAs to AWS Lambda, which will let you scale to 100 reqs/s painlessly all the while leveraging CloudFront's edge cache.

[Limits on Lambda@Edge](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-limits.html#limits-lambda-at-edge).

## Getting Started

```bash
npm install aws-serverless-express-edge
```

```js
// lambda.js
'use strict'
const awsServerlessExpress = require('aws-serverless-express-edge')
const app = require('./app')
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)
```

[Package and create your Lambda function](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html), in `us-east-1`, then link it to a CloudFront distribution as an `Origin Request`.

## Quick Start/Example

TODO

### Getting the Edge event object
This package includes middleware to easily get the event object Lambda receives from API Gateway

```js
const awsServerlessExpressMiddleware = require('aws-serverless-express-edge/middleware')
app.use(awsServerlessExpressMiddleware.eventContext())
app.get('/', (req, res) => {
  res.json(req.edge.event)
})
```
