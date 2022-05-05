import './toolbar.scss';
interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement>{}

const Toolbar: React.FC<ToolbarProps> = ({ ...props }) => {
  const { children, ...rest } = props;
  return (
    <div className="toolbar__container" {...rest}>
      {children}
    </div>
  );
};

export default Toolbar;
