import { ReactNode, ChangeEvent } from 'react'
import { observer } from "mobx-react-lite";
import { Input, InputProps } from 'antd';

interface PropsInput extends InputProps {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  suffix?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

const CompInput = (props: PropsInput) => {
  return (
    <Input.Password {...props} />
  )
}

export default observer(CompInput)
