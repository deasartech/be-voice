// import AWS from "aws-sdk";
// import dotenv from "dotenv";
// import crypto from "crypto";
// import { promisify } from "util";

// dotenv.config();

// const region = process.env.AWS_REGION;
// const bucketName = process.env.AWS_S3_BUCKET_NAME;
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// export const s3 = new AWS.S3({
//   region,
//   accessKeyId,
//   secretAccessKey,
//   signatureVersion: "v4",
// });

// export async function generateUploadUrl() {
//   const randomBytes = promisify(crypto.randomBytes);
//   const rawBytes = await randomBytes(16);
//   const imageName = rawBytes.toString("hex");

//   const params = {
//     Bucket: bucketName,
//     Key: "image name",
//     Expires: 60,
//   };

//   const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
//   return uploadUrl;
// }
