import './toolbar.scss';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ToolbarButton: React.FC<ButtonProps> = ({ ...props }) => {
  const { children, ...rest } = props;
  return (
    <button className="toolbar__button" {...rest}>
      {children}
    </button>
  );
};

export default ToolbarButton;
 