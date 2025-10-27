import * as HeroIcon from '@heroicons/react/24/outline'
import { ComponentProps } from 'react';

export type IconProps = {
  name: keyof typeof HeroIcon;
  className?: string;
} & ComponentProps<typeof HeroIcon.AcademicCapIcon>
