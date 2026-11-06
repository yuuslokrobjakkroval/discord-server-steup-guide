import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const buttonVariants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4', {variants:{variant:{default:'bg-[#baff40] text-[#161914] hover:bg-[#ceff79]',outline:'border border-white/15 bg-white/5 text-white hover:bg-white/10',ghost:'text-zinc-400 hover:text-white hover:bg-white/5'},size:{default:'h-10 px-4 py-2',sm:'h-8 rounded-md px-3 text-xs',icon:'h-9 w-9'}},defaultVariants:{variant:'default',size:'default'}});
function Button({className,variant,size,asChild=false,...props}:React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {asChild?:boolean}) { const Comp=asChild?Slot:'button'; return <Comp className={cn(buttonVariants({variant,size,className}))} {...props}/>; }
export {Button,buttonVariants};
