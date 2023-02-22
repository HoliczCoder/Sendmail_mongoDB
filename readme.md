Here is the instruction

1. Create a database in MongoDB CLoud

- Create a DATABASE_URL

2. Create a RabbitMQ Instance

- Create a AMPQ_URL_CLOUD

3. Create a sendgrid account

- Create a new Sender
- Create a new API Key

5. Add above values to .env file
   PORT=3000
   DATABASE_URL =""
   AMPQ_URL_CLOUD ="" 
   SENDGRID_API_KEY_SECOND=""

6. Go to Subscriber.controller.ts

- Create amount of subscribers along with their categories

5. Go to Message.controllner.ts

- using API createMessage for testing create message
- Each mail will send to subscriber with cateogory they subscribed
- Mail template is in documents/mjml2html.ts
- It contains unsubscribe button to unsubscribe cateogory
- If mail sent failed, isSendingFail field in subscriber will change to true
- If mail sent sucessfully, lastSendDate will be updated
- CronJob can be used but never tested before
