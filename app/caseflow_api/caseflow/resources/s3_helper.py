import boto3
from botocore.exceptions import ClientError

aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
aws_session_token = YOUR_SESSION_TOKEN
region = REGION_NAME

def create_bucket(bucket_name):
    try : 
     s3 = boto3.client('s3',
                      aws_access_key_id=aws_access_key_id, 
                      aws_secret_access_key=aws_secret_access_key, 
                      region_name=region)
     response =   s3.create_bucket(Bucket=bucket_name, CreateBucketConfiguration={
    'LocationConstraint': region})
     return response

    except Exception as e: 
        return e


def upload_object(bucket_name,privacy_policy,data,file_name):
    
    try : 
     is_exists = check_bucket(bucket_name)
     if is_exists is False :
        bucket = create_bucket(bucket_name)  
     s3 = boto3.client('s3',
                      aws_access_key_id=aws_access_key_id, 
                      aws_secret_access_key=aws_secret_access_key, 
                      region_name=region)
     # Privacy policy 'private'|'public-read'|'public-read-write'|'authenticated-read'|'aws-exec-read'|'bucket-owner-read'|'bucket-owner-full-control'
     response =   s3.put_object(
     privacy_policy,  
     Body= data,
     Bucket = bucket_name,
     Key=file_name
    )
     return response

    except Exception as e: 
        return e



def delete_object(bucket_name,file_name):
    
    try : 
     s3 = boto3.client('s3',
                      aws_access_key_id=aws_access_key_id, 
                      aws_secret_access_key=aws_secret_access_key, 
                      region_name=region)
     response =   s3.delete_object(
     Bucket = bucket_name,
     Key=file_name
    )
     return response

    except Exception as e: 
        return e


def get_object(bucket_name,file_name):
    
    try : 
     s3 = boto3.client('s3',
                      aws_access_key_id=aws_access_key_id, 
                      aws_secret_access_key=aws_secret_access_key, 
                      region_name=region)
     response =   s3.get_object(
     Bucket = bucket_name,
     Key=file_name
    )
     return response

    except Exception as e: 
        return e

def check_bucket(bucket_name):
    
    try : 
        s3 = boto3.client('s3',
                      aws_access_key_id=aws_access_key_id, 
                      aws_secret_access_key=aws_secret_access_key, 
                      region_name=region)
        try :                
            s3.head_bucket(
            Bucket = bucket_name,
            )
            exists = True
            return exists
        except ClientError as error:
            error_code = int(error.response['Error']['Code'])
            if error_code == 403:
                print("Private Bucket. Forbidden Access! ", bucket_name)
            elif error_code == 404:
                print("Bucket Does Not Exist!", bucket_name)
            exists = False
            return exists

    except Exception as e: 
        return e

