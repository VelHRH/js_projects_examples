import { FC, HTMLProps, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  className?: HTMLProps<HTMLElement>["className"];
}

const Button: FC<ButtonProps> = ({ children, className }) => {
  return (
    <button
      className={`p-3 text-xl text-slate-950 bg-slate-50 rounded-lg ${className} active:scale-95 duration-200`}
    >
      {children}
    </button>
  );
};

export default Button;
