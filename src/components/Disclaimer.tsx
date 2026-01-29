import { AlertTriangle, Shield, BookOpen } from 'lucide-react';

export const Disclaimer = () => {
  return (
    <div className="bg-secondary/30 border border-border rounded-xl p-4 max-w-2xl mx-auto">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="text-foreground font-medium mb-1">
            Educational & Authorized Use Only
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            This tool performs <span className="text-primary">passive reconnaissance</span> using publicly available data. 
            Only scan domains and systems you own or have explicit authorization to test. 
            Unauthorized scanning may violate laws and regulations.
          </p>
        </div>
      </div>
    </div>
  );
};
