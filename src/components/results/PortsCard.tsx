import { Radio, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import type { PortResult } from '@/types/recon';

interface PortsCardProps {
  ports: PortResult[];
}

const getStatusIcon = (status: PortResult['status']) => {
  switch (status) {
    case 'open':
      return <CheckCircle2 className="w-4 h-4 text-success" />;
    case 'closed':
      return <XCircle className="w-4 h-4 text-muted-foreground" />;
    case 'filtered':
      return <HelpCircle className="w-4 h-4 text-warning" />;
  }
};

const getRiskClass = (risk: PortResult['risk']) => {
  switch (risk) {
    case 'low':
      return 'status-success';
    case 'medium':
      return 'status-warning';
    case 'high':
      return 'status-danger';
  }
};

export const PortsCard = ({ ports }: PortsCardProps) => {
  const openPorts = ports.filter(p => p.status === 'open');
  const closedPorts = ports.filter(p => p.status !== 'open');

  return (
    <div className="cyber-card animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Radio className="w-5 h-5 text-primary" />
        Common Ports Scan
      </h3>

      <p className="text-xs text-muted-foreground mb-4">
        Limited scope scan of common web and service ports. This is passive reconnaissance only.
      </p>

      {/* Open Ports */}
      {openPorts.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Open Ports ({openPorts.length})
          </h4>
          <div className="grid gap-2">
            {openPorts.map((port) => (
              <div
                key={port.port}
                className="bg-secondary/50 p-3 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(port.status)}
                  <div>
                    <span className="font-mono text-sm text-foreground font-medium">
                      Port {port.port}
                    </span>
                    <span className="text-muted-foreground text-sm ml-2">
                      {port.service}
                    </span>
                  </div>
                </div>
                <span className={getRiskClass(port.risk)}>
                  {port.risk} risk
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Closed/Filtered Ports Summary */}
      {closedPorts.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Closed/Filtered ({closedPorts.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {closedPorts.map((port) => (
              <div
                key={port.port}
                className="bg-secondary px-3 py-1.5 rounded flex items-center gap-2 text-sm"
              >
                {getStatusIcon(port.status)}
                <span className="font-mono text-muted-foreground">
                  {port.port}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
