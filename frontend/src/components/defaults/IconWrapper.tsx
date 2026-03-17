import { ComponentType, SVGProps } from 'react';

type IconWrapperProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  size?: number;
  className?: string;
};

export default function IconWrapper({ icon: Icon, size = 24, className }: IconWrapperProps) {
  return <Icon width={size} height={size} className={className} />;
}
