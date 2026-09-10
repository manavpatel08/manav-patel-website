import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={`${className} flex flex-wrap justify-center gap-x-1.5 gap-y-1`} style={style}>
      {words.map((word, index) => (
        <WordSpan
          key={index}
          word={word}
          index={index}
          total={words.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
};

interface WordSpanProps {
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const WordSpan: React.FC<WordSpanProps> = ({ word, index, total, scrollYProgress }) => {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{word}</span>
      <motion.span
        className="absolute left-0 top-0"
        style={{ opacity }}
      >
        {word}
      </motion.span>
    </span>
  );
};

export default AnimatedText;

// done
