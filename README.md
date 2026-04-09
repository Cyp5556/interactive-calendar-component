# 🗓️ Interactive Calendar Component

A polished, responsive, and feature-rich interactive calendar component built using **Next.js**, inspired by a physical wall calendar design.

This project was developed as part of a frontend engineering challenge, focusing on **UI/UX quality, component architecture, and interactive functionality**.

---

## 🚀 Live Demo

🔗 [View Live Project](https://interactive-calendar-component-mocha.vercel.app/)

---

## 🎥 Demo Video

🔗 [Watch Demo](https://www.loom.com/share/c3bf78e72a1b404eb627a4ff38a11f3f)

---

## ✨ Features

### 🎨 UI / UX

* Wall calendar aesthetic with dynamic **month-based hero images**
* Clean, modern, and premium design
* Fully responsive (desktop + mobile)
* Smooth hover effects and animations

---

### 📅 Calendar Functionality

* Dynamic **month navigation** (previous / next)
* Accurate calendar grid rendering
* Today’s date highlight
* No internal scrolling — full calendar visible

---

### 🔁 Date Range Selection

* Select start and end date
* Automatic range highlighting (connected UI)
* Smart edge handling:

  * Auto-swap if end < start
  * Reset on re-selection

---

### 📝 Notes System

* Add notes to a specific date or date range
* Notes persist using `localStorage`
* Auto-load notes when re-selecting dates
* Edit, update, and delete notes
* Visual indicators (dots) on dates with notes
* Hover preview of saved notes

---

### ⚡ UX Enhancements

* Context-aware UI (selection vs no selection)
* Save state feedback ("Saved!" toast)
* Character count in notes input
* Smooth animations using Framer Motion

---

## 🧠 System Design Overview

This is a **frontend-only architecture** designed with clean separation of concerns and modular components.

### 🧩 Component Structure

* `CalendarContainer` → Main layout
* `CalendarHeader` → Month navigation
* `CalendarGrid` → Calendar rendering logic
* `DayCell` → Individual date interaction
* `NotesPanel` → Notes handling and UI

---

### 🔄 State Management

Handled using React hooks:

* `currentMonth` → Controls visible calendar
* `startDate`, `endDate` → Range selection
* `notes` → Stored and retrieved from localStorage

---

### 💾 Data Persistence

* Uses browser `localStorage`
* Key format:

  * Single date → `YYYY-MM-DD`
  * Date range → `YYYY-MM-DD_YYYY-MM-DD`

---

### ⚙️ Data Flow

1. User selects date or range
2. State updates (`startDate`, `endDate`)
3. UI reflects selection
4. Notes saved/retrieved via localStorage
5. Calendar updates dynamically on month change

---

## 🛠️ Tech Stack

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **Ant Design**
* **Day.js**
* **Framer Motion**

---

## 📦 Installation & Setup

```bash
git clone https://github.com/your-username/interactive-calendar-component.git
cd interactive-calendar-component
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📱 Responsiveness

* Desktop → side-by-side layout
* Mobile → stacked layout
* Optimized for usability across devices

---

## 🎯 Key Engineering Decisions

* Prioritized **UI/UX before logic implementation**
* Used **component-based architecture** for scalability
* Implemented **localStorage** for persistence (as per requirement)
* Ensured **no internal scroll** for better usability
* Focused on **clean and maintainable code**

---

## 🚧 Future Improvements

* Year selector
* Drag-based range selection
* Cloud sync for notes
* Holiday/event integration

---

## 🙌 Acknowledgement

This project was built as part of a frontend engineering challenge to demonstrate strong fundamentals in **React, UI design, and product thinking**.

---
