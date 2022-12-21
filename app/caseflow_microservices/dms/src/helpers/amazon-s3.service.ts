import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AmazonS3Service {
  constructor(private readonly configService: ConfigService) {}
  getDocument() {
    return 'Hello From Micro Service';
  }

  // summery : Upload File to S3
  // Created By : Don C Varghese
  async uploadDocument(data: any, fileName: string): Promise<any> {
    let base64data = new Buffer(data, 'binary');
    const s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });
    console.log(this.configService.get('AWS_BUCKET_NAME'))
    return await s3
      .upload({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Body: base64data,
        Key: `${uuid()}-${fileName}`,
      })
      .promise();
  }
}
