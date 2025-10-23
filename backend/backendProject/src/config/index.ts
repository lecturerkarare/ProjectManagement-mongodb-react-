export const IS_PROD = process.env.NODE_ENV === "production";
export const PORT = process.env.PORT || 3001;
export const JWT_SECRET_KEY = `${process.env.JWT_SECRET}`;
export const Access_Key =`${process.env.Access_Key }`;
export const Secret_Access=`${process.env.Secret_Access}`;
export const PAYPAL_CLIENT_SECRET=`${process.env.PAYPAL_CLIENT_SECRET}`;
export const PAYPAL_CLIENT_ID=`${process.env.PAYPAL_CLIENT_ID}`;
export const GOOGLE_WEB_CLIENT_ID=`${process.env.Google_ID}`
export const DefaultTokenForTesting ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjViZTFhM2M4ODdjNzI0ODQ4MDc3ZjFjIiwicm9sZSI6WyI2NWJlMTNkYTk4ZGJiYTM1YTg5MzJmNjUiXSwiaWF0IjoxNzA2OTU3NDMzLCJleHAiOjE3MDY5OTM0MzN9.h4rYMnzpdH8qK4yZuxRSShbwP0JMUHduHJlvMHG2ziY"
export  const  DB="mongodb+srv://felexonyango19:@Felex2030@cluster0.voshhwm.mongodb.net/?retryWrites=true"
