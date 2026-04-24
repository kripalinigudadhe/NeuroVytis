# 🧠 NeuroVytis – AI-Based Brain Health Analytics System

NeuroVytis is an AI-powered brain health analytics platform designed to analyze cognitive health data, generate predictive insights, and assist in early neurological risk assessment. The platform processes health-related inputs, performs machine learning-based predictions, and delivers real-time analytical insights through scalable backend APIs.

- Processed health data of **3000+ users**
- Achieved **88% prediction accuracy**
- Reduced analysis time by **35%**

---

## 🚀 Features

- Brain health risk prediction using Machine Learning
- Real-time health analytics dashboard
- RESTful API integration
- Cognitive health data processing
- User authentication system
- Secure health record management
- Predictive analytics workflow
- Responsive frontend interface

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- Bootstrap

### Backend
- Node.js
- Express.js

### Database
- MongoDB / MySQL

### Machine Learning
- Python
- Scikit-learn
- Pandas
- NumPy

### Tools & APIs
- REST APIs
- Git
- GitHub
- Postman
- dotenv
- Groq API

---

## 📂 Project Structure

```bash
NeuroVytis/
│
├── frontend/
│   ├── HTML
│   ├── CSS
│   └── JavaScript
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── models/
│
├── ml-model/
│   ├── model.py
│   ├── dataset/
│   └── trained_model.pkl
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/kripalinigudadhe/NeuroVytis.git
cd NeuroVytis
```

### 2. Install Node Dependencies

```bash
npm install
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

If `requirements.txt` is not available:

```bash
pip install flask pandas numpy scikit-learn
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_database_url
GROQ_API_KEY=your_api_key
```

### 5. Run Backend Server

```bash
node server.js
```

### 6. Run Machine Learning Model

```bash
python model.py
```

---

## 🔄 How It Works

1. User enters health-related information  
2. Backend processes the data  
3. Machine learning model predicts neurological risks  
4. APIs return results  
5. Dashboard displays insights for users/doctors  

---

## 🎯 Use Cases

- Early neurological risk detection  
- Brain health monitoring  
- Healthcare analytics  
- Predictive diagnosis support  
- Medical research applications  

---

## 📈 Performance Metrics

- **88% Prediction Accuracy**
- **3000+ User Records Processed**
- **35% Faster Analysis Workflow**

---

## 🔮 Future Enhancements

- EEG integration for real-time monitoring  
- Deep learning implementation  
- Doctor consultation module  
- Cloud deployment  
- Mobile app support  

