
 CommUnity - Community interaction and  Management System

CommUnity is a modular, multi-tenant Community Management System designed to simplify housing society management by connecting members and streamlining daily activities. The platform provides an efficient interface for both administrators and residents, facilitating interaction, management, and engagement within the community.

 Features

- User Authentication and Registration: Secure login and registration functionality for residents and administrators.
- Resident and Society Management: Manage resident and society details, including flats and resident associations.
- Event and Notice Management: Admins can create, update, and delete events or notices; residents can view and provide feedback on them.
- Complaint and Service Request Management: Residents can file complaints or service requests, track their statuses, and view the outcomes.
- Maintenance Payment System: Integration of online payment through Razorpay, where residents can pay monthly maintenance bills, and admins can track payments.

 Outcomes

- A platform that simplifies housing society management and enhances communication between residents and administrators.
- Increased resident participation through events, polls, clubs, and social interactions.
- Transparent financial transactions with easy bill generation, online payments, and payment tracking.
- Quick access to emergency contacts and security personnel, enhancing safety within the community.


 Technologies Used

- Frontend: React.js, Vite (for fast bundling)
- Backend: Spring Boot (Java-based framework)
- Database: MongoDB (NoSQL database for flexible schema management)
- Payment Gateway: Razorpay API for online payments



 Setup and Installation

Follow these steps to set up the project locally:

1. Clone the Repository
```bash
git clone https://github.com/ramkrishna115/Seamless-Community-Interaction-and-Management-.git
```

 2. Install Backend Dependencies
Navigate to the backend directory and install the necessary dependencies. Since we’re using **Spring Boot**, you can use Maven . Here’s how to install dependencies using Maven:

```bash
cd backend
mvn clean install
```
 3. Install Frontend Dependencies (React + Vite)
Navigate to the frontend directory and install the necessary dependencies:

```bash
cd frontend
npm install
```

 4. Set Up MongoDB
Make sure you have a MongoDB instance running. 

Update the `application.properties` file in the backend with the MongoDB connection details:

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/commUnityDB
```

 5. Set Up Razorpay API
Sign up at [Razorpay](https://razorpay.com/) and get your **API key**. Configure the key in the backend `application.properties` file:

```properties
razorpay.api.key=your_razorpay_api_key
razorpay.api.secret=your_razorpay_secret_key
```

 6. Run the Application

 For Backend (Spring Boot):
```bash
cd backend
mvn spring-boot:run
```

 For Frontend (React + Vite):
```bash
cd frontend
npm run dev
```

Now, you can access the application in your browser at [http://localhost:3000](http://localhost:3000) for the frontend, and the backend API will be running at [http://localhost:8080](http://localhost:8080).

---
