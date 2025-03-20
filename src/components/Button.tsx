interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <div>
      <button onClick={onClick} className="btn">
        {children}
      </button>
    </div>
  );
}
