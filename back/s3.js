import aws from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const region = "ap-south-1";
const bucketName = "yeouido-dish-s3-bucket";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export async function generateUploadURL(file_name) {
  const params = {
    Bucket: bucketName,
    Key: file_name,
    Expires: 60,
  };
  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
