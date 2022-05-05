import './toolbar.scss';
interface ToolbarStatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
}

const ToolbarStat: React.FC<ToolbarStatProps> = ({ ...props }) => {
  const { label, value, ...rest } = props;
  return (
    <div className="toolbar__info__container" {...rest}>
      <span className="toolbar__info__label">{label}</span>
      <span className="toolbar__info__value">{value}</span>
    </div>
  );
};

export default ToolbarStat;
