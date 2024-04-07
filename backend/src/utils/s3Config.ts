import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import sharp from 'sharp';

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketregion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

let options: any = {};

if (bucketName || bucketregion || accessKey || secretAccessKey) {
  options.credentials = {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  };
  options.region = bucketregion;
} else {
  console.error(
    'Unable to access environment variables for s3 config'
  );
}

const s3 = new S3Client(options);

const getImageUrl = async (avatar: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: avatar,
    });
    const url = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });
    return url;
  } catch (error) {
    console.error('Error getting signed URL:', error);
    return null; // or throw error if appropriate
  }
};

const addImageToS3 = async (file: any, imageName: string) => {
  try {
    const buffer = await sharp(file.buffer)
      .resize({ height: 1080, width: 1080 })
      .toBuffer();

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

const deleteImageFromS3 = async (key: string) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);
  } catch (error) {
    console.error('Error deleting image on S3:', error);
    throw error;
  }
};

export { getImageUrl, addImageToS3, deleteImageFromS3 };
