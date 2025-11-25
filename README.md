# 🎮 Tic Tac Toe - Epic Battle Arena

> A stunning, fully-responsive two-player Tic Tac Toe game with modern animations, immersive sound effects, and epic celebration visuals. Built with vanilla HTML5, CSS3, and JavaScript - no frameworks required!

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)](https://github.com/fardin-khan-nur)

[🎮 Play Now](#-quick-start) • [✨ Features](#-features) • [📖 Usage](#-how-to-play) • [🔧 Installation](#-installation) • [👨‍💻 Author](#-author)

</div>

---

## 🌟 Overview

**Epic Battle Arena** is not just another Tic Tac Toe game - it's an experience! With breathtaking animations, dynamic sound effects, and celebration visuals, this game transforms the classic 3x3 grid into an engaging gaming experience that works flawlessly on any device.

Whether you're a casual player looking for some fun or a developer wanting to learn game development, this project offers the perfect blend of entertainment and educational value.

---

## ✨ Features

### 🎨 **Stunning Visual Design**

- **Modern Dark Theme**: Sleek dark interface with carefully chosen color palette
- **Gradient Colors**: Beautiful color gradients throughout the UI
  - Primary Purple: `#667eea` (Player X)
  - Accent Pink/Red: `#f5576c` (Player O)
  - Success Green: `#43e97b` (Buttons)
  - Cyan Highlights: `#00f2fe` (Effects)

- **Glass-Morphism Effects**: Modern frosted glass look with backdrop blur
- **Starfield Background**: Animated twinkling stars in the background
- **Professional UI Layout**: Clean, organized interface with clear player cards and VS indicator
- **Real-time Player Indicators**: Shows whose turn it is with active player highlighting

### 🎬 **Smooth Animations & Transitions**

- **Header Animations**:
  - Slide-down entrance effect
  - Bouncing title with glow
  - Pulsing background glow effect

- **Game Board Animations**:
  - Scale-in effect on load
  - Smooth cell fill animations
  - Pop-in effect for symbols
  - Hover animations with elevation

- **Dialog Effects**:
  - Pop-in animations for modals
  - Smooth backdrop blur fade
  - Form input focus animations

- **Button Interactions**:
  - Hover elevation effect
  - Shimmer effect on hover
  - Ripple effect on click
  - Smooth color transitions

### 🔊 **Complete Audio System**

All sound effects are generated using **Web Audio API** - no external files needed!

- **Game Start Sound** 🎵
  - Two ascending notes: 500Hz → 700Hz
  - Sets the mood for battle
  - Plays when entering player names

- **Move Sound** 🔔
  - Single beep: 600Hz
  - Plays on EVERY move
  - Works for all matches
  - Provides instant audio feedback

- **Win Sound** 🎺
  - Victory fanfare: 800Hz → 1000Hz → 1200Hz
  - Three ascending notes for celebration
  - Plays when someone wins
  - Synced with celebration effects

- **Tie Sound** 🎶
  - Neutral notification: 650Hz + 750Hz
  - Two-note harmony
  - Plays on tie games
  - Different from win to indicate draw

**Sound Quality**: Cross-browser compatible, works on all modern browsers with full Web Audio API support

### 🎉 **Epic Celebration Effects**

#### Victory Celebration:
- **Floating Bubbles**: 
  - Random emoji selection: 🎉✨🌟⭐🎊🎈💫🎆🎇✨🎁🏆
  - 12 bubbles float upward from center
  - Staggered timing for wave effect
  - 3-second float duration

- **Confetti Rain**:
  - 40+ colorful confetti pieces
  - Falls from top of screen
  - Rotating during fall
  - Multiple color options
  - 2.5-second animation

- **Triple Burst Effect**:
  - Initial confetti burst
  - Second burst at 300ms
  - Third burst at 600ms
  - Creates intensity and excitement

- **Sound Integration**:
  - Victory fanfare plays with effects
  - Synchronized audio-visual experience

#### Tie Game Celebration:
- **Lighter Effects**:
  - 8 bubbles instead of 12
  - Single confetti burst
  - Tie-specific sound notification
  - Balanced celebration feel

### 📱 **Fully Responsive Design**

Optimized for every device size:

#### Desktop (769px and up)
- Full-sized gameboard and UI
- Optimal font sizes
- Maximum visual effects
- Enhanced spacing

#### Tablet (481px - 768px)
- Slightly reduced board size
- Adjusted typography
- Touch-friendly buttons
- Optimized spacing for smaller screens

#### Mobile (320px - 480px)
- Compact but readable layout
- Mobile-optimized board (320px)
- Touch-friendly interface
- Responsive grid gaps
- Flexible font sizing

#### Very Small Devices (Under 320px)
- Minimal but functional layout
- Scalable components
- Readable text
- Playable game experience

**Responsive Features**:
- CSS `clamp()` for fluid scaling
- Flexible Grid layout
- Mobile-first approach
- Touch-optimized buttons
- Readable text at all sizes
- Proper viewport configuration
- No horizontal scrolling

### 🎯 **Game Features**

- **Two-Player Local Gameplay**: Perfect for friends and family
- **Player Name Customization**: Enter custom names for each player
- **Live Turn Indicator**: Real-time display of whose turn it is
- **Player Cards**: Visual representation with symbol and name
- **Win Detection Algorithm**: Checks rows, columns, and diagonals
- **Tie Detection**: Knows when board is full with no winner
- **New Game Button**: Quick restart without page reload
- **Play Again Button**: Continue playing after game ends
- **Smooth Turn Transitions**: Animated transition between players
- **Visual Feedback**: Highlight active player card

---

## 🚀 Quick Start

### ⚡ **Instant Play** (30 seconds)

### Author: @fardin-khan-nur

1. **Download or Clone**:
   ```bash
   git clone https://github.com/fardin-khan-nur/tic-tac-toe.git
   cd tic-tac-toe
