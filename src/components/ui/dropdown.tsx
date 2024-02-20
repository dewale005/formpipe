/* eslint-disable import/extensions */
import { Button, CheckIcon, Menu } from '@mantine/core';
import React, { HTMLAttributes, useState } from 'react';
import { options } from '@/api';

interface ComponentProps {
  title: string;
  data: Array<options>;
  onChange: (value: options) => void;
}

interface IDropDownProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'>,
    ComponentProps {}

const DropDown = React.forwardRef<HTMLDivElement, IDropDownProps>(
  ({ title, data, onChange, ...props }, ref) => {
    const [value, setValue] = useState<options>({
      value: '',
      label: title,
    });

    const handleDropdown = (el: options) => {
      if (value.label === el.label && value.value === el.value) {
        onChange({ label: '', value: '' });
        setValue({ value: '', label: title });
      } else {
        onChange(el);
        setValue(el);
      }
    };

    return (
      <div ref={ref} {...props}>
        <Menu position="bottom-end">
          <Menu.Target>
            <Button variant={value.value === '' ? 'light' : 'filled'} radius="lg">
              {value.label}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Please Select An Option</Menu.Label>
            {data.map((el, index) => (
              <Menu.Item
                key={index}
                leftSection={
                  value.label === el.label && <CheckIcon style={{ width: 14, height: 14 }} />
                }
                onClick={() => handleDropdown(el)}
              >
                {el.label}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </div>
    );
  }
);

DropDown.displayName = 'Dropdown';

export { DropDown };
export type { ComponentProps };
