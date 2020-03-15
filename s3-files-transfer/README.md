# S3 files transfer

AWS [Simple Storage Service (S3)](https://aws.amazon.com/s3/) is a good solution
to store the assets of your serverless application. Moreover lambdas could be triggered on S3 events.

## Public Bucket

If your assets are public you could create a public S3 bucket and let your clients
create and retrieve them freely.

## Secured Bucket

If you want control the access of your bucket, simply let it as default.
By default nobody can access a bucket without specific rights over it.

You should then grant access to the bucket to your lambdas.

Finally you could grant temporary access to the bucket to your clients
through [signed urls](https://docs.aws.amazon.com/AmazonS3/latest/dev/ShareObjectPreSignedURL.html).

⚠ The lambda which issue the signed url **must** have the rights you want to pass to your client through the url.
In fact you pass the role of your lambda to your client.

## Trigger a lambda on S3 events

S3 events are natively supported by Serverless framework. You can directly use it as event of your function.

Serverless doc: https://serverless.com/framework/docs/providers/aws/events/s3/

Moreover if you don't provide a existing bucket as source, serverless will crete it for you

⚠ Serverless add some suffixes to the name you provide it.
