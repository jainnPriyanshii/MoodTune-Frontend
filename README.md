# 🎵 MoodTune

### Music That Understands Your Mood

MoodTune is an AI-powered music recommendation application that analyzes a user's emotional state through facial expressions and text input, then curates personalized music playlists based on the detected mood.

The application combines Computer Vision, Natural Language Processing, and Music Recommendation techniques to create a personalized and emotionally aware listening experience.

---

## ✨ Features

### 🎭 Mood Detection

Detect emotions using:

* Facial Expression Analysis
* Text-Based Sentiment Analysis
* Multi-Modal Mood Fusion

Supported emotions:

* Happy
* Sad
* Angry
* Fear
* Surprise
* Disgust
* Neutral

---

### 🎵 Personalized Music Recommendations

Generate playlists based on:

* Detected Mood
* Emotional Intensity
* Mood Blending

Examples:

| Mood     | Playlist Style              |
| -------- | --------------------------- |
| Happy    | Feel-good Pop, Upbeat Hits  |
| Sad      | Lo-fi, Emotional Ballads    |
| Angry    | Rock, Intense Beats         |
| Fear     | Calming Ambient Music       |
| Surprise | Trending & Energetic Tracks |
| Neutral  | Chill Instrumentals         |

---

### ☕ Cozy Listening Experience

MoodTune is designed around a warm and calming aesthetic inspired by:

* Coffee Shops
* Reading Corners
* Vinyl Music Cafés
* Evening Ambience

The goal is to create a comforting environment where users can relax and discover music that matches their emotions.

---

## 🏗️ System Architecture

```text
User
 │
 ▼
React Native App
 │
 ├── Camera Input
 ├── Text Input
 │
 ▼
Flask Backend
 │
 ├── DeepFace
 ├── HuggingFace Transformers
 │
 ▼
Mood Fusion Engine
 │
 ▼
Final Mood Prediction
 │
 ▼
Music Recommendation Layer
 │
 ▼
JioSaavn API
 │
 ▼
Personalized Playlist
```

---

## 📱 Application Flow

```text
Home Screen
      │
      ▼
Mood Detection
      │
      ▼
Emotion Analysis
      │
      ▼
Playlist Generation
      │
      ▼
Music Player
```

---

## 🚀 Tech Stack

### Frontend

* React Native
* Expo
* React Navigation
* Context API
* AsyncStorage
* Axios

### Backend

* Python
* Flask
* Flask-CORS

### Machine Learning

* DeepFace
* HuggingFace Transformers
* DistilRoBERTa Emotion Model

### APIs

* JioSaavn API

---

## 🧠 AI Pipeline

### Face Emotion Detection

MoodTune uses DeepFace to analyze facial expressions and extract emotion probabilities.

Example:

```json
{
  "happy": 72,
  "sad": 10,
  "neutral": 18
}
```

---

### Text Emotion Detection

User text is analyzed using a pre-trained DistilRoBERTa model to identify emotional patterns.

Example:

Input:

"I'm excited about tomorrow."

Output:

```json
{
  "joy": 0.84,
  "surprise": 0.10,
  "neutral": 0.06
}
```

---

### Mood Fusion

MoodTune combines face and text signals using a confidence-weighted fusion strategy.

Benefits:

* More reliable predictions
* Better handling of ambiguous emotions
* Reduced dependence on a single input source

---

## 📂 Project Structure

```text
src
│
├── screens
│   ├── HomeScreen
│   ├── MoodDetectionScreen
│   ├── PlaylistScreen
│   └── PlayerScreen
│
├── components
│   ├── MoodCard
│   ├── SongCard
│   ├── PrimaryButton
│   └── LoadingOverlay
│
├── services
│   ├── moodApi
│   └── playlistApi
│
├── context
│   └── MoodContext
│
├── navigation
│   └── AppNavigator
│
├── constants
│   ├── colors
│   ├── spacing
│   └── typography
│
└── utils
```

---

## 🎨 Design Philosophy

MoodTune follows a cozy and emotionally driven design language.

Color Inspiration:

* Espresso Brown
* Coffee Beige
* Warm Cream
* Soft White

Inspired By:

* Coffee Shops ☕
* Books 📖
* Music 🎧
* Evening Calm 🌙

The interface focuses on simplicity, emotional comfort, and distraction-free listening.

---

## 🔮 Future Enhancements

* Mood History Tracking
* Personalized Recommendation Engine
* User Favorites
* Spotify Integration
* Apple Music Integration
* Mood Analytics Dashboard
* Voice-Based Emotion Detection
* Hybrid Recommendation System

---

## 📸 Screens

* Home Screen
* Mood Detection Screen
* Playlist Screen
* Music Player Screen

(Add screenshots here after UI completion)

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/MoodTune.git
```

### Navigate to Project

```bash
cd MoodTune
```

### Install Dependencies

```bash
npm install
```

### Start Expo

```bash
npx expo start
```

---

## 👩‍💻 Author

Priyanshi Jain

B.Tech Computer Science & Artificial Intelligence

Full Stack & React Native Developer

Currently exploring Artificial Intelligence, Machine Learning, NLP, Vector Databases, and LLM Applications.

---

## 🌟 Project Goal

MoodTune aims to bridge emotions and music by creating an intelligent listening experience where technology understands how users feel and recommends music that resonates with their emotional state.
