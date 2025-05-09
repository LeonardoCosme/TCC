'use client';
import { useState, useEffect } from 'react';

const images = [
  '/carousel1.jpg',
  '/carousel2.jpg',
  '/carousel3.jpg'
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000); // 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto mt-6">
      <img
        src={images[index]}
        alt="Serviço"
        className="rounded-xl w-full h-64 object-cover transition duration-700 ease-in-out"
      />
      <button
        onClick={prev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-70 px-2 py-1 rounded-r hover:bg-opacity-90"
      >
        ❮
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-70 px-2 py-1 rounded-l hover:bg-opacity-90"
      >
        ❯
      </button>
    </div>
  );
}