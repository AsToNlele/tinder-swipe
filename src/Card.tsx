import {
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useState } from 'react';

enum cardDirection {
  left = 'left',
  right = 'right',
  top = 'top',
}

function Card({ zIndex, forename }: { zIndex: number; forename: string }) {
  const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
  // Preload images
  for (const image of images) {
    const imageElement = new Image();
    imageElement.src = image;
  }
  const [isDragging, setIsDragging] = useState(false);
  console.log('isdragging: ', isDragging);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [30, -30]);
  const likeBackground = useTransform(
    x,
    [0, 20, 100],
    ['rgba(0, 255, 0, 0)', 'rgba(0, 255, 0, 1)', 'rgba(0, 255, 0, 0.3)']
  );
  const dislikeBackground = useTransform(
    x,
    [0, -20, -100],
    ['rgba(255,0,0,0)', 'rgba(255, 0, 0, 1)', 'rgba(255, 0, 0, 0.3)']
  );

  const superlikeBackground = useTransform(
    y,
    [0, -60, -100],
    ['rgba(0, 255, 255, 0)', 'rgba(0, 255, 255, 1)', 'rgba(0, 255, 255, 0.3)']
  );

  const completeCard = (direction: cardDirection) => {
    if (direction != cardDirection.top) {
      animation.start({
        x: Math.sign(direction === 'right' ? 1 : -1) * 1000,
        opacity: 0,
        transition: { duration: 1 },
      });
    } else {
      animation.start({
        y: -1000,
        opacity: 0,
        transition: { duration: 1 },
      });
    }
  };

  const imagePrev = () => {
    if (currentImageIndex > 0 && !isDragging) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const imageNext = () => {
    if (currentImageIndex < images.length - 1 && !isDragging) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const animation = useAnimationControls();
  return (
    <motion.div
      animate={animation}
      className="w-96 aspect-[10/16] col-span-full row-span-full flex overflow-hidden"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      style={{ x, y, rotate: rotate, zIndex: zIndex }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        if (Math.abs(info.offset.x) > 150) {
          Math.sign(info.offset.x) === 1
            ? completeCard(cardDirection.right)
            : completeCard(cardDirection.left);
        } else if (Math.abs(info.offset.y) > 150) {
          completeCard(cardDirection.top);
        }
      }}
    >
      <div
        className={`background rounded-md flex-1 flex items-center justify-end flex-col bg-gray-400`}
        style={{
          background: `linear-gradient(rgba(0,0,0, 0.1) 70%, black 90%) no-repeat center center / cover, url("${images[currentImageIndex]}") no-repeat center center / cover`,
        }}
      >
        <div className="flex flex-row items-center justify-evenly w-full px-1 pt-1">
          {images.map((img, index) => {
            return (
              <div
                className={`flex-1 h-1 w-full m-1 rounded-xl bg-gray-400 ${
                  index === currentImageIndex ? 'bg-white' : ''
                }`}
              ></div>
            );
          })}
        </div>
        <div className="w-full h-full flex flex-row">
          <div className="flex-1" onClick={imagePrev}></div>
          <div className="flex-1" onClick={imageNext}></div>
        </div>
        <div className="w-full px-8 text-left">
          <p className="m-0 p-0">
            <span className="m-0 mb-2 mr-2 text-2xl font-bold">{forename}</span>
            <span className="text-xl">22</span>
          </p>
          <div>
            <p className="m-0">Popisek</p>
            <p className="m-0">dalsi</p>
          </div>
        </div>
        <div className="py-4 flex items-center justify-evenly w-full">
          <div className="h-10 w-10 rounded-full flex items-center justify-center text-lg border border-orange-400">
            🔄
          </div>
          <motion.div
            className="h-12 w-12 rounded-full flex items-center justify-center text-2xl border border-red-500"
            style={{ background: dislikeBackground }}
            whileTap={{ backgroundColor: 'red' }}
            onTap={() => completeCard(cardDirection.left)}
          >
            ❌
          </motion.div>
          <motion.div
            className="h-10 w-10 rounded-full flex items-center justify-center text-lg border border-cyan-400 border border-cyan-300"
            style={{ background: superlikeBackground }}
            whileTap={{ backgroundColor: 'cyan' }}
            onTap={() => completeCard(cardDirection.top)}
          >
            ⭐
          </motion.div>
          <motion.div
            className="h-12 w-12 rounded-full flex items-center justify-center text-2xl border border-green-500"
            style={{ background: likeBackground }}
            whileTap={{ backgroundColor: 'green' }}
            onTap={() => completeCard(cardDirection.right)}
          >
            💚
          </motion.div>
          <div className="h-10 w-10 rounded-full flex items-center justify-center text-lg border border-orange-400 border border-purple-500">
            ⚡
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
