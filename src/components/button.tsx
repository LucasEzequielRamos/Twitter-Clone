import { ReactNode } from 'react';

const Button: React.FC<{ 
  color?: string, 
  text: string, 
  textColor: string, 
  icon?: ReactNode,
  border?: boolean,
}> = ({ color = 'white', text, textColor, icon, border }) => {
  return (
    <button className={`bg-${color} text-${textColor} my-1 rounded-3xl w-80 text-sm h-10 font-semibold flex items-center justify-center gap-2 ${border ? 'border border-slate-500' : ''}`} >
      {icon}
      {text}
    </button>
  );
}

export default Button;
