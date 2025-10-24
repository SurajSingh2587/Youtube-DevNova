import { Youtube } from 'lucide-react';
import type { SVGProps } from 'react';

const AppLogo = (props: SVGProps<SVGSVGElement>) => (
  <div className="flex items-center gap-2" >
    <Youtube className="h-8 w-8 text-primary" />
    <span className="text-xl font-bold tracking-tighter">YouTube</span>
  </div>
);

export default AppLogo;
