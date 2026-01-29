import { Database, Calendar, Building, Globe } from 'lucide-react';
import type { DNSRecord, DomainInfo } from '@/types/recon';

interface DNSRecordsCardProps {
  records: DNSRecord[];
  domainInfo: DomainInfo;
}

export const DNSRecordsCard = ({ records, domainInfo }: DNSRecordsCardProps) => {
  const recordsByType = records.reduce((acc, record) => {
    if (!acc[record.type]) acc[record.type] = [];
    acc[record.type].push(record);
    return acc;
  }, {} as Record<string, DNSRecord[]>);

  return (
    <div className="cyber-card animate-fade-in-delay-2">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Database className="w-5 h-5 text-primary" />
        DNS & Domain Information
      </h3>

      {/* Domain Info */}
      <div className="mb-6 pb-6 border-b border-border">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Domain Details
        </h4>
        <div className="space-y-1">
          {domainInfo.registrar && (
            <div className="data-row">
              <span className="data-label flex items-center gap-2">
                <Building className="w-4 h-4" />
                Registrar
              </span>
              <span className="data-value">{domainInfo.registrar}</span>
            </div>
          )}
          {domainInfo.createdDate && (
            <div className="data-row">
              <span className="data-label flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Created
              </span>
              <span className="data-value">{domainInfo.createdDate}</span>
            </div>
          )}
          {domainInfo.age && (
            <div className="data-row">
              <span className="data-label">Age</span>
              <span className="data-value">{domainInfo.age}</span>
            </div>
          )}
          {domainInfo.expiryDate && (
            <div className="data-row">
              <span className="data-label">Expires</span>
              <span className="data-value">{domainInfo.expiryDate}</span>
            </div>
          )}
        </div>
      </div>

      {/* DNS Records */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
          DNS Records
        </h4>
        <div className="space-y-4">
          {Object.entries(recordsByType).map(([type, recs]) => (
            <div key={type}>
              <div className="flex items-center gap-2 mb-2">
                <span className="status-info">{type}</span>
              </div>
              <div className="space-y-1 pl-2">
                {recs.map((record, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-mono text-sm text-foreground break-all">
                      {record.value}
                    </span>
                    {record.ttl && (
                      <span className="text-xs text-muted-foreground">
                        TTL: {record.ttl}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nameservers */}
      {domainInfo.nameservers.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Nameservers
          </h4>
          <div className="flex flex-wrap gap-2">
            {domainInfo.nameservers.map((ns, i) => (
              <span key={i} className="font-mono text-sm bg-secondary px-2 py-1 rounded">
                {ns}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
