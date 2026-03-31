import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

export const HeroParallax = ({
  products,
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Snappy spring ONLY for the 3D perspective entry — tracks scroll tightly
  const springConfig = { stiffness: 300, damping: 40, bounce: 0 };

  // Row translations use raw transforms (no spring) — eliminates horizontal lag completely
  const translateX = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const translateXReverse = useTransform(scrollYProgress, [0, 1], [0, -600]);

  // 3D perspective entry — spring here is fine as it's a one-time entry animation
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [12, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [0.05, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [18, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 150]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[280vh] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-16 mb-16">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-16 space-x-16 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-16">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-32 px-6 w-full left-0 top-0">
      <h1 className="font-serif text-[clamp(2.4rem,6vw,4.8rem)] font-bold text-neutral-950 leading-[1.1] tracking-tight">
        Discover <br /> the next big things.
      </h1>
      <p className="max-w-2xl text-[16px] md:text-[18px] mt-8 text-neutral-500 leading-relaxed font-medium">
        We showcase India's most innovative startups and rising brands building for the next billion.
        Explore the visionary products defining the future of homegrown excellence.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -15,
        transition: { duration: 0.2 }
      }}
      key={product.title}
      className="group/product h-80 w-[24rem] relative flex-shrink-0"
    >
      <div className="block group-hover/product:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 rounded-[10px] overflow-hidden bg-neutral-100 h-full w-full border border-neutral-200/50 isolate">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          loading="lazy"
          className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-700 group-hover/product:scale-110 rounded-[10px]"
          alt={product.title}
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-30 bg-black pointer-events-none rounded-[10px] transition-all duration-500"></div>
      <div className="absolute bottom-6 left-6 opacity-0 group-hover/product:opacity-100 transition-all duration-500 translate-y-2 group-hover/product:translate-y-0 text-white">
        <p className="text-[14px] font-bold tracking-wide uppercase opacity-70 mb-1">Featured Brand</p>
        <h2 className="text-[20px] font-bold">
          {product.title}
        </h2>
      </div>
    </motion.div>
  );
};
