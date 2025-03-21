# Telegram Bot

Bu loyiha Telegram bot bo'lib, foydalanuvchilarga turli xil xizmatlarni taqdim etadi.

## 🚀 Xususiyatlar
- **Filmlar ro‘yxati**: Eng mashhur filmlarni inline klaviatura orqali tanlash mumkin.
- **Video yuborish**: Bot orqali MP4 formatidagi videolarni jo‘natish.
- **Web-App integratsiyasi**: Foydalanuvchilar ma'lumotlarini saqlash va qayta ishlash imkoniyati.

## 📦 Texnologiyalar
- **Backend**: Node.js, Express.js
- **Ma'lumotlar bazasi**: MongoDB
- **Bot kutubxonasi**: node-telegram-bot-api

## 🛠 O‘rnatish
1. **Loyihani klonlash**
   ```sh
   git clone https://github.com/the-ict/akbaraTvbot
   cd akbaraTvbot
   ```

2. **Bog‘liqliklarni o‘rnatish**
   ```sh
   npm install
   ```

3. **Muhit o‘zgaruvchilarini sozlash (.env)**
   ```env
   TOKEN=your-telegram-bot-token
   MONGO_URI=your-mongodb-connection-string
   ```

4. **Botni ishga tushirish**
   ```sh
   npm start
   ```

## ⚙️ API Endpointlari
| Endpoint | Metod | Tavsif |
|----------|-------|--------|
| `/web-app` | POST | Foydalanuvchi ma'lumotlarini saqlash |
| `/` | POST | Foydalanuvchi ma'lumotlarini olish |

## 📝 Muallif
**Ismingiz** - [Telegram](https://t.me/use_ict)

