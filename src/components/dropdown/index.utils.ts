import { ReactNode } from "react";

interface DropdownOption {
  label: ReactNode | string;
  value: string;
  icon?: ReactNode;
  sc?: string;
}

interface Range {
  from?: number;
  to?: number;
}

export interface SelectProps {
  options?: DropdownOption[];
  className?: string;
  placeholder?: string;
  subLabel?: string;
  label?: string;
  currentValue?: string | string[];
  onChange?: (value: string, sc?: string) => void;
  onBlur?: (e: any) => void;
  id?: string;
  name?: string;
  required?: boolean;
}

export interface SortProps extends SelectProps {
  title: string | ReactNode;
  variant?: "primary" | "secondary";
  sortByLabel?: boolean;
}

export interface MultiProps extends SelectProps {
  title: string | ReactNode;
  variant?: "primary" | "secondary";
  onApply?: () => void;
  onClear?: () => void;
}

export interface RangeProps extends SelectProps {
  title: string | ReactNode;
  variant?: "primary" | "secondary";
  onApply?: () => void;
  onClear?: () => void;
  onRangeChange?: ({ from, to }: Range) => void;
  rangeFrom?: number | undefined;
  rangeTo?: number | undefined;
}
export interface CategoryProps extends SelectProps {
  title: string | ReactNode;
  variant?: "primary" | "secondary";
}
