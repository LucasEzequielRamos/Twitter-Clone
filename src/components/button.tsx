import { ReactNode } from 'react';

const Button: React.FC<{ 
  white?: boolean, 
  secondary?: boolean, 
  transparent?: boolean,
  text: string, 
  txtWhite?: boolean, 
  txtSecondary?: boolean, 
  txtBlack?: boolean, 
  icon?: ReactNode,
  border?: boolean,
}> = ({ 
  white = false, 
  secondary = false, 
  transparent = false, 
  text, 
  txtWhite = false, 
  txtSecondary = false, 
  txtBlack = false,
  icon, 
  border 
}) => {
  
  const bgClass = white
    ? 'bg-white' 
    : secondary 
    ? 'bg-secondary' 
    : transparent 
    ? 'bg-transparent' 
    : '';

  const textClass = txtWhite
    ? 'text-white'
    : txtSecondary
    ? 'text-secondary'
    : txtBlack
    ? 'text-black'
    : '';

  return (
    <button 
      className={`my-1 rounded-3xl w-72 text-sm h-10 font-semibold flex items-center justify-center gap-2 
        ${bgClass} ${textClass} ${border ? 'border border-slate-500' : ''}`} 
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
