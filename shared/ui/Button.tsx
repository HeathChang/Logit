interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const Button = () => {
  return (
    <button>
      <h1>Button</h1>
    </button>
  );
};

export default Button;