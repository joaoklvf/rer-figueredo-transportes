import * as HeroIcon from '@heroicons/react/24/outline'
import { IconProps } from './interfaces';

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = HeroIcon[name];
  return <IconComponent {...props} />
};
