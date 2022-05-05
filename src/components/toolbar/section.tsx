import './toolbar.scss';
interface ToolbarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const ToolbarSection: React.FC<ToolbarSectionProps> = ({ title, ...props }) => {
  const { children, ...rest } = props;
  return (
    <div className="toolbar__section__container">
      <h3 className="toolbar__section__title">{title}</h3>
      <div className="toolbar__section__stack" {...rest}>
        {children}
      </div>
    </div>
  );
};

export default ToolbarSection;
