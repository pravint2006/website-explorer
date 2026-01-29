import { FileCode2, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';
import type { HTTPHeader } from '@/types/recon';

interface HeadersCardProps {
  headers: HTTPHeader[];
}

const getStatusIcon = (status: HTTPHeader['status']) => {
  switch (status) {
    case 'good':
      return <CheckCircle2 className="w-4 h-4 text-success" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-warning" />;
    case 'bad':
      return <XCircle className="w-4 h-4 text-destructive" />;
    case 'info':
      return <Info className="w-4 h-4 text-primary" />;
  }
};

const getStatusClass = (status: HTTPHeader['status']) => {
  switch (status) {
    case 'good':
      return 'border-l-success';
    case 'warning':
      return 'border-l-warning';
    case 'bad':
      return 'border-l-destructive';
    case 'info':
      return 'border-l-primary';
  }
};

export const HeadersCard = ({ headers }: HeadersCardProps) => {
  const securityHeaders = headers.filter(h => 
    ['Content-Security-Policy', 'X-Frame-Options', 'X-Content-Type-Options', 
     'Strict-Transport-Security', 'X-XSS-Protection', 'Referrer-Policy',
     'Permissions-Policy'].includes(h.name)
  );

  const otherHeaders = headers.filter(h => !securityHeaders.includes(h));

  return (
    <div className="cyber-card animate-fade-in-delay-3">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <FileCode2 className="w-5 h-5 text-primary" />
        HTTP Headers Analysis
      </h3>

      {/* Security Headers */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Security Headers
        </h4>
        <div className="space-y-2">
          {securityHeaders.length === 0 ? (
            <p className="text-sm text-muted-foreground">No security headers detected</p>
          ) : (
            securityHeaders.map((header, i) => (
              <div
                key={i}
                className={`bg-secondary/50 p-3 rounded-lg border-l-4 ${getStatusClass(header.status)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(header.status)}
                      <span className="font-mono text-sm font-medium text-foreground">
                        {header.name}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground break-all">
                      {header.value}
                    </p>
                    {header.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {header.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Other Headers */}
      {otherHeaders.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Response Headers
          </h4>
          <div className="space-y-1">
            {otherHeaders.map((header, i) => (
              <div key={i} className="data-row">
                <span className="data-label font-mono">{header.name}</span>
                <span className="data-value truncate max-w-[60%]" title={header.value}>
                  {header.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
