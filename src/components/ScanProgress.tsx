import { Loader2, CheckCircle2, Circle } from 'lucide-react';

interface ScanProgressProps {
  currentStep: number;
  steps: string[];
}

export const ScanProgress = ({ currentStep, steps }: ScanProgressProps) => {
  return (
    <div className="cyber-card max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
        <span className="terminal-text font-semibold">Scanning target...</span>
      </div>
      
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div
              key={step}
              className={`flex items-center gap-3 transition-all duration-300 ${
                isComplete ? 'text-success' : isCurrent ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {isComplete ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
              <span className="font-mono text-sm">{step}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 h-1 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 rounded-full"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
};
