import { useState } from 'react';
import { Code2, Server, Globe, FileCode2, Radio, Shield, Network } from 'lucide-react';
import type { ReconResult } from '@/types/recon';
import { TechnologyCard } from './results/TechnologyCard';
import { ServerInfoCard } from './results/ServerInfoCard';
import { DNSRecordsCard } from './results/DNSRecordsCard';
import { HeadersCard } from './results/HeadersCard';
import { PortsCard } from './results/PortsCard';
import { RiskSummaryCard } from './results/RiskSummaryCard';
import { SubdomainsCard } from './results/SubdomainsCard';

interface ResultsTabsProps {
  result: ReconResult;
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: Shield },
  { id: 'subdomains', label: 'Subdomains', icon: Network },
  { id: 'tech', label: 'Technologies', icon: Code2 },
  { id: 'server', label: 'Server', icon: Server },
  { id: 'dns', label: 'DNS', icon: Globe },
  { id: 'headers', label: 'Headers', icon: FileCode2 },
  { id: 'ports', label: 'Ports', icon: Radio },
];

export const ResultsTabs = ({ result }: ResultsTabsProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-secondary/50 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <RiskSummaryCard risks={result.risks} overallRisk={result.overallRisk} />
            <div className="space-y-6">
              <ServerInfoCard serverInfo={result.serverInfo} />
              <TechnologyCard technologies={result.technologies} />
            </div>
          </div>
        )}

        {activeTab === 'subdomains' && (
          <SubdomainsCard 
            subdomains={result.subdomains || []}
            hostingNetworks={result.hostingNetworks || []}
            serviceBanners={result.serviceBanners || []}
          />
        )}

        {activeTab === 'tech' && (
          <TechnologyCard technologies={result.technologies} />
        )}

        {activeTab === 'server' && (
          <ServerInfoCard serverInfo={result.serverInfo} />
        )}

        {activeTab === 'dns' && (
          <DNSRecordsCard records={result.dnsRecords} domainInfo={result.domainInfo} />
        )}

        {activeTab === 'headers' && (
          <HeadersCard headers={result.httpHeaders} />
        )}

        {activeTab === 'ports' && (
          <PortsCard ports={result.ports} />
        )}
      </div>
    </div>
  );
};
