import { observer } from "mobx-react-lite";
import { Select, SelectProps } from "antd";

interface IProps extends SelectProps<string> {
  source: { id: string | number; label: string }[];
}

const CompSelect = (props: IProps) => {
  return (
    <Select {...props}>
      {props.source.slice().map((x: { id: string | number; label: string }) => (
        <Select.Option key={`${x.id}`} value={x.id}>
          {x.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default observer(CompSelect);
