# Moonfall: Learning Management System
**by: Gerami Sadeghi, Salvador Rios, Victor Nguyen, Hieu Nguyen, and Florentino Becerra**

Moonfall is a learning management system (LMS) designed to help educators and administrators manage online courses. Students can enroll in courses while instructors/teachers can create courses/content for the students to enroll in. The application integrates AWS architecture in the backend and also integrates a secure payment platform for students to pay for courses and teachers to earn money from the work they developed.

## How to run:

1. **Clone the repository**
2. **Install the required packages**  
   Run `npm install` on **BOTH** client and server.
3. **Set up DynamoDB Local**  
   Ensure Java is installed on your computer and download DynamoDB local by following this [setup guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html).
4. **Create environment files**  
   Make **TWO** `.env` files:
   - One in the **client** (`.env.local`)
   - One in the **server** (`.env`)  

   Use the following formats and ensure you have accounts for **CLERK authentication** and **Stripe**, and grab their secret and access keys.

   **Client `.env` example**:

    NEXT_PUBLIC_API_BASE_URL=http://localhost:8001/
    NEXT_PUBLIC_LOCAL_URL=http://localhost:3000/

    NEXT_PUBLIC_STRIPE_PUBLIC_KEY=YOUR-STRIPE-PUBLIC-KEY
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR-CLERK-PUBLISHABLE-KEY
    CLERK_SECRET_KEY=YOUR-CLERK-SECRET-KEY

    **Server `.env` example**:

    PORT=8001
    NODE_ENV=development

    AWS_REGION=YOUR-AWS-REGION
    S3_BUCKET_NAME=YOUR-S3-BUCKET-NAME
    CLOUDFRONT_DOMAIN=YOUR-CLOUDFRONT-DOMAIN

    STRIPE_SECRET_KEY=YOUR-STRIPE-SECRET-KEY

    CLERK_PUBLISHABLE_KEY=YOUR-CLERK-PUBLISHABLE-KEY
    CLERK_SECRET_KEY=YOUR-CLERK-SECRET-KEY


5. **Start the application**  
    
    Run `npm run dev` on **BOTH** the server side and client side.

6. **Access the application**  
    
    Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the content and create accounts/demo the features.


### Sidenote:
To create a teacher account:
- First, create a regular account within the application.
- Go to the **Clerk authentication dashboard** and edit the user's profile by modifying the **PUBLIC metadata** to the following format:
```json
{
   "userType": "teacher"
}

Save the changes and refresh your browser. You will then be able to access /teacher/courses.