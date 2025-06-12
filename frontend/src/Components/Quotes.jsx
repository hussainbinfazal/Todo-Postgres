import axios from "axios";
import React, { useState, useEffect } from "react";

const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
  "It does not matter how slowly you go as long as you do not stop. - Confucius",
  "Hardships often prepare ordinary people for an extraordinary destiny. - C.S. Lewis",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Success is not how high you have climbed, but how you make a positive difference to the world. - Roy T. Bennett",
  "Don’t watch the clock; do what it does. Keep going. - Sam Levenson",
  "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
  "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
  "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart. - Roy T. Bennett",
  "In the end, we only regret the chances we didn’t take. - Lewis Carroll",
  "Act as if what you do makes a difference. It does. - William James",
  "Believe you can and you’re halfway there. - Theodore Roosevelt",
  "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh",
  "Dream big and dare to fail. - Norman Vaughan",
  "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  "Everything you’ve ever wanted is on the other side of fear. - George Addair",
  "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
  "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
  "The road to success and the road to failure are almost exactly the same. - Colin R. Davis",
  "Don’t be afraid to give up the good to go for the great. - John D. Rockefeller",
  "If you can dream it, you can do it. - Walt Disney",
  "It always seems impossible until it’s done. - Nelson Mandela",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
  "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. - Winston Churchill",
  "The best way to predict the future is to create it. - Abraham Lincoln",
  "You miss 100% of the shots you don’t take. - Wayne Gretzky",
  "I find that the harder I work, the more luck I seem to have. - Thomas Jefferson",
  "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
  "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well. - Ralph Waldo Emerson",
  "Your limitation—it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It’s going to be hard, but hard does not mean impossible.",
  "Don’t wait for opportunity. Create it.",
  "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
  "The key to success is to focus on goals, not obstacles.",
  "Dream it. Believe it. Build it.",
  "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It’s going to be hard, but hard does not mean impossible.",
  "Don’t wait for opportunity. Create it.",
  "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
  "The key to success is to focus on goals, not obstacles.",
  "Dream it. Believe it. Build it.",
  "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
  "You are braver than you believe, stronger than you seem, and smarter than you think.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "The best way to predict your future is to create it.",
  "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
  "Act as if what you do makes a difference. It does.",
  "Believe you can and you’re halfway there.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Dream big and dare to fail.",
  "You are never too old to set another goal or to dream a new dream.",
  "Everything you’ve ever wanted is on the other side of fear.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "The road to success and the road to failure are almost exactly the same.",
  "Don’t be afraid to give up the good to go for the great.",
  "If you can dream it, you can do it.",
  "It always seems impossible until it’s done.",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
  "The best way to predict the future is to create it.",
  "You miss 100% of the shots you don’t take.",
  "I find that the harder I work, the more luck I seem to have.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.",
  "Your limitation—it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It’s going to be hard, but hard does not mean impossible.",
  "Don’t wait for opportunity. Create it.",
  "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
  "The key to success is to focus on goals, not obstacles.",
  "Dream it. Believe it. Build it.",
  "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
];

const Quotes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(quotes[currentIndex]);

  // Function to change the quote index
  const changeQuote = () => {
    let newIndex = currentIndex + 1;

    // Loop back to the beginning if we've reached the end of the array
    if (newIndex >= quotes.length) {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
    setCurrentQuote(quotes[newIndex]);
  };

  useEffect(() => {
    // Change the quote every 3 seconds (3000ms)
    const interval = setInterval(changeQuote, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [currentIndex]);
  return (
    <div class="max-w-md mx-auto mt-5 p-4 bg-blue-500 rounded-md shadow-md flex items-center justify-center">
  <p class="text-lg font-medium text-white quote">“{currentQuote}”</p>
</div>
  );
};

export default Quotes;
