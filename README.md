<div align="center">

# 🌟 SkillUp  
### *Peer-to-Peer Skill Exchange & Mentorship Platform*  

🚀 A full-stack platform for **teaching, learning, and collaboration** through  
💎 **credit-based skill swaps** and 🎓 **paid mentorship courses**.  

<img width="300" height="200" alt="SkillUp Logo" src="https://github.com/user-attachments/assets/0a37638c-1a96-4d9a-bcbb-00a7d1b2ed85" />

---

![React](https://img.shields.io/badge/react-374151.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/Node.js-6DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000.svg?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-316192.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101.svg?style=for-the-badge&logo=socket.io&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF.svg?style=for-the-badge&logo=stripe&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000.svg?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
</div>  

---

## 📖 Overview  

**SkillUp** bridges the gap between learners and mentors by creating a **collaborative ecosystem** where users can:  
- Swap skills for free using a **credit-based system**  
- Monetize expertise via **structured mentorship programs**  

It ensures **affordable learning, secure transactions, and real-time engagement**, powered by a scalable **MERN stack + real-time features**.  

---

## 🏗️ System Architecture  

```mermaid
graph TD
    A[👤 User Profiles] -->|Skills + Preferences| B[(⚙️ Matching Algorithm)]
    B --> C[🔔 Real-Time Notifications: Socket.IO]
    B --> D[(💎 Credit System)]
    D --> E[📚 Free Skill Swaps]
    D --> F[💳 Paid Mentorship Courses]
    F --> G[(Stripe Payment Gateway)]
    C --> H[🌐 Responsive React.js Frontend]
    H --> I[(MongoDB Database)]
````

---

## ✨ Features

* 🔎 **Skill Matching Algorithm** → Node.js + Express.js + MongoDB ensures relevant matches
* 💡 **Skill Swaps & Mentorship** → Choose between **free credit-based exchanges** or **premium paid mentorship**
* 📲 **Real-Time Notifications** → Socket.IO delivers instant updates for sessions & reviews
* 💎 **Credit System** → Earn credits by teaching, spend to learn — fair & transparent
* 🛡️ **Verified Learners** → REST APIs for vetting learners/mentors
* 💳 **Secure Payments** → Stripe/PayPal integrations for smooth payouts
* 🌐 **Modern UI/UX** → React.js frontend with responsive design across devices
* ⭐ **Community Reviews** → MongoDB-backed system for mentor & learner ratings

---

## ⚙️ Tech Stack

* **Frontend** → HTML, CSS, JavaScript, React.js
* **Backend** → Node.js + Express.js (REST APIs)
* **Database** → MongoDB (profiles, credits, reviews, transactions)
* **Real-Time** → Socket.IO for notifications
* **Security** → JWT, bcrypt.js, Helmet
* **Payments** → Stripe API

---

## 📊 Workflow

1. **User registers profile** → selects skills & learning interests
2. **Matching Algorithm** → finds best peer or mentor
3. **Credit Transactions** → managed securely for swaps
4. **Session Confirmation** → real-time notification via Socket.IO
5. **Mentorship Courses** → secure payments via Stripe/PayPal
6. **Community Feedback** → ratings & reviews stored in MongoDB

---

## 🗺️ Roadmap

* [x] Credit-based skill exchange
* [x] Real-time matching & notifications
* [x] Payment gateway integration
* [ ] AI-driven skill recommendations
* [ ] Mobile App (React Native)
* [ ] Gamification (badges, leaderboards)

---

## 👥 Team & Contributors

* 👨‍💻 [Titas Kabiraj](https://github.com/titas-kabiraj)
* 👨‍💻 [Sagnik Basak](https://github.com/SagnikBasak04)
* 👨‍💻 [Aryan Ghosh](https://github.com/Aryan-Ghosh-Code)
* 👨‍💻 [Srijit Roy](https://github.com/Srijit27)

---

## 🚀 Getting Started

### 🔹 Backend (Node.js + Express.js)

```bash
cd backend
npm install
npm run dev
```

### 🔹 Frontend (React.js)

```bash
cd frontend
npm install
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file in backend:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
STRIPE_KEY=your_stripe_key
PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

## 📈 Example Credit Transaction Log

```
====================================================================================================
 User                Action         Credits Earned   Credits Spent   Balance   Description
 Sganik Basak        Teach Coding     +50              0             350       Earned by teaching JS basics
 Aryan Ghosh         Learn Coding     0                -50           250       Spent to learn JS basics
====================================================================================================

N.B.: INITIAL DEFAULT CREDITS: 300
```

---

## 📜 License

MIT License © 2025 **SkillUp Team**

---

<div align="center">

⭐ If you like this project, consider giving it a **star** to support us!

🌍 Together, let’s make **learning affordable, collaborative, and global** ✨
**SkillUp – Empowering people, one skill at a time. 🚀**

</div>
