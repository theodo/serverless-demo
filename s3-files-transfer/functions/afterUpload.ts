import { S3Event } from "aws-lambda";

export const main = async (event: S3Event): Promise<void> => {
  const records = event.Records;
  records.forEach(
    ({
      eventName,
      s3: {
        bucket: { name },
        object
      }
    }) => {
      console.log(`received ${eventName} from ${name}:`);
      console.log(object);
    }
  );
};
