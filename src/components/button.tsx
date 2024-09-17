const Button: React.FC<{ color?: string, text: string }> = ({ color = 'white', text }) => {
  return (
    <button className={`bg-${color}`}>{text}</button>
  )
}

export default Button