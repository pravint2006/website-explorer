import { Server, MapPin, Building2, Network } from 'lucide-react';
import type { ServerInfo } from '@/types/recon';

interface ServerInfoCardProps {
  serverInfo: ServerInfo;
}

export const ServerInfoCard = ({ serverInfo }: ServerInfoCardProps) => {
  return (
    <div className="cyber-card animate-fade-in-delay-1">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Server className="w-5 h-5 text-primary" />
        Server Information
      </h3>

      <div className="space-y-1">
        <div className="data-row">
          <span className="data-label flex items-center gap-2">
            <Network className="w-4 h-4" />
            IP Address
          </span>
          <span className="data-value">{serverInfo.ip || 'N/A'}</span>
        </div>

        {serverInfo.hostname && (
          <div className="data-row">
            <span className="data-label">Hostname</span>
            <span className="data-value">{serverInfo.hostname}</span>
          </div>
        )}

        <div className="data-row">
          <span className="data-label flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Provider
          </span>
          <span className="data-value">{serverInfo.provider || 'Unknown'}</span>
        </div>

        <div className="data-row">
          <span className="data-label flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </span>
          <span className="data-value">{serverInfo.location || 'Unknown'}</span>
        </div>

        {serverInfo.asn && (
          <div className="data-row">
            <span className="data-label">ASN</span>
            <span className="data-value">{serverInfo.asn}</span>
          </div>
        )}

        {serverInfo.organization && (
          <div className="data-row">
            <span className="data-label">Organization</span>
            <span className="data-value">{serverInfo.organization}</span>
          </div>
        )}
      </div>
    </div>
  );
};
