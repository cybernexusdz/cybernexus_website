import { cn } from '@/lib/utils'; 

interface TitleProps {
    text: string; 
    className?: string;
}

export const Title: React.FC<TitleProps> = ({ 
    text,  
    className = '' 
}) => { 

    return (
        <p className={cn(
            'text-3xl font-bold chakra-petch-bold leading-tight tracking-tighter md:text-4xl', 
            className
        )}>
            {text}
        </p>
    );
};