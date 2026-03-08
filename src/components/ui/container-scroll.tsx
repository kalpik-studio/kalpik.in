import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import React from "react";
import { cn } from "~/utils/cn";
import { MovingBorderButton } from "./moving-border";

export const ContainerScroll = ({
  users = [],
  titleComponent,
  className,
  cardClassName,
}: {
  users?: {
    name: string;
    designation: string;
    image: string;
    badge?: string;
  }[];
  titleComponent: string | React.ReactNode;
  className?: string;
  cardClassName?: string;
  registerLinkType?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className={cn(
        "relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-20",
        className,
      )}
      ref={containerRef}
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{
          perspective: "1000px",
        }}
      >
        <ContainerScrollHeader
          translate={translate}
          titleComponent={titleComponent}
        />
        <ContainerScrollCard
          className={cardClassName}
          rotate={rotate}
          translate={translate}
          scale={scale}
          users={users}
        />
      </div>

      <MovingBorderButton
        as="a"
        href={`#`}
        containerClassName={cn(
          "absolute bottom-8 text-white w-auto hover:bg-accent-accent2",
        )}
        className={"whitespace-nowrap px-8"}
      >
        Register with InnBell
      </MovingBorderButton>
    </div>
  );
};

const ContainerScrollHeader = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => {
  return (
    <m.div
      style={{
        translateY: translate,
      }}
      className="div relative z-10 mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </m.div>
  );
};

const ContainerScrollCard = ({
  rotate,
  scale,
  translate,
  users,
  className,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  users: {
    name: string;
    designation: string;
    image: string;
    badge?: string;
  }[];
  className?: string;
}) => {
  return (
    <m.div
      style={{
        rotateX: rotate, // rotate in X-axis
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-6 shadow-2xl md:h-[40rem]"
    >
      <div
        className={cn(
          "grid h-full w-full grid-cols-1 gap-4 overflow-hidden rounded-2xl bg-gray-100 p-4 md:grid-cols-3 lg:grid-cols-5",
          className,
        )}
      >
        {users.map((user, idx: number) => (
          <m.div
            key={`user-${idx}`}
            className="relative cursor-pointer rounded-md bg-white"
            style={{ translateY: translate }}
            whileHover={{
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            }}
          >
            <div className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-xs font-bold">
              {user.badge}
            </div>
            <img
              src={user.image}
              className="rounded-tl-md rounded-tr-md text-sm "
              alt="thumbnail"
            />
            <div className="p-4">
              <h1 className="text-sm font-semibold ">{user.name}</h1>
              <h2 className=" text-xs text-gray-500 ">{user.designation}</h2>
            </div>
          </m.div>
        ))}
      </div>
    </m.div>
  );
};
