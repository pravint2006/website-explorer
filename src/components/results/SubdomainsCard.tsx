import { Globe, Server, Activity, MoreVertical, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SubdomainRecord, HostingNetwork, ServiceBanner } from '@/types/recon';

interface SubdomainsCardProps {
  subdomains: SubdomainRecord[];
  hostingNetworks: HostingNetwork[];
  serviceBanners: ServiceBanner[];
}

const WorldMap = ({ locations }: { locations: { lat: number; lng: number; country: string }[] }) => {
  // Simple world map visualization with dots
  return (
    <div className="relative w-full h-48 bg-secondary/30 rounded-lg overflow-hidden">
      {/* Simplified world map outline */}
      <svg viewBox="0 0 360 180" className="w-full h-full opacity-30">
        <path
          d="M0,90 Q90,60 180,90 T360,90"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary/50"
        />
        {/* Simplified continents */}
        <ellipse cx="80" cy="70" rx="35" ry="25" className="fill-primary/20" />
        <ellipse cx="160" cy="60" rx="40" ry="35" className="fill-primary/20" />
        <ellipse cx="280" cy="80" rx="30" ry="40" className="fill-primary/20" />
        <ellipse cx="100" cy="120" rx="20" ry="25" className="fill-primary/20" />
        <ellipse cx="300" cy="130" rx="25" ry="20" className="fill-primary/20" />
      </svg>
      
      {/* Location dots */}
      {locations.map((loc, i) => {
        const x = ((loc.lng + 180) / 360) * 100;
        const y = ((90 - loc.lat) / 180) * 100;
        return (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
          </div>
        );
      })}
      
      {/* Zoom controls */}
      <div className="absolute left-2 top-2 flex flex-col gap-1">
        <button className="w-6 h-6 bg-secondary/80 rounded text-xs hover:bg-secondary flex items-center justify-center">+</button>
        <button className="w-6 h-6 bg-secondary/80 rounded text-xs hover:bg-secondary flex items-center justify-center">−</button>
      </div>
    </div>
  );
};

const HostingNetworkBox = ({ networks }: { networks: HostingNetwork[] }) => {
  const mainNetwork = networks[0];
  return (
    <div className="flex items-center justify-center h-48">
      <div className="border-2 border-primary/50 rounded-lg p-8 text-center bg-primary/5">
        <span className="text-sm font-mono text-primary">{mainNetwork?.name || 'UNKNOWN'}</span>
      </div>
    </div>
  );
};

const ServiceDonutChart = ({ banners }: { banners: ServiceBanner[] }) => {
  const total = banners.reduce((sum, b) => sum + b.count, 0);
  const mainService = banners[0];
  
  return (
    <div className="flex flex-col items-center justify-center h-48">
      <div className="relative w-24 h-24">
        {/* Donut chart */}
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeDasharray={`${(mainService?.count / total) * 97.5} 97.5`}
            className="drop-shadow-glow"
          />
        </svg>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{mainService?.name}</span>
        <span className="text-sm font-mono text-foreground">{mainService?.count}</span>
      </div>
    </div>
  );
};

export const SubdomainsCard = ({ subdomains, hostingNetworks, serviceBanners }: SubdomainsCardProps) => {
  const locations = subdomains
    .filter(s => s.location)
    .map(s => s.location!);

  return (
    <div className="space-y-6">
      {/* Top Section - Three Columns */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="card-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              System Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WorldMap locations={locations} />
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Server className="w-4 h-4 text-primary" />
              Hosting / Networks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <HostingNetworkBox networks={hostingNetworks} />
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Services / Banners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ServiceDonutChart banners={serviceBanners} />
          </CardContent>
        </Card>
      </div>

      {/* A Records Table */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            A Records (subdomains from dataset)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Host</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">IP</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">ASN</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">ASN Name</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Open Services (from DB)</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">RevIP</th>
                  <th className="w-8"></th>
                </tr>
              </thead>
              <tbody>
                {subdomains.map((record, i) => (
                  <tr key={i} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-2 font-mono text-xs text-foreground">{record.host}</td>
                    <td className="py-3 px-2">
                      <div className="font-mono text-xs text-foreground">{record.ip}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs font-mono bg-primary/10 text-primary border-primary/30">
                          ASN:{record.asn}
                        </Badge>
                        <div className="text-xs text-muted-foreground font-mono">
                          {record.ip.split('.').slice(0, 3).join('.')}.0/24
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono text-xs text-muted-foreground">{record.asnName}</td>
                    <td className="py-3 px-2">
                      <div className="space-y-1">
                        {record.services.map((svc, j) => (
                          <div key={j} className="flex items-start gap-2 text-xs">
                            <Badge 
                              variant="outline" 
                              className={`text-xs font-mono ${
                                svc.port === 'http' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                svc.port === 'http8080' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                                'bg-blue-500/10 text-blue-400 border-blue-500/30'
                              }`}
                            >
                              {svc.port}
                            </Badge>
                            <span className="text-muted-foreground">{svc.service}</span>
                          </div>
                        ))}
                        {record.services.slice(0, 2).map((svc, j) => (
                          <div key={`detail-${j}`} className="text-xs text-muted-foreground pl-2">
                            <span className="text-muted-foreground/60">title:</span> {svc.title}
                            <br />
                            <span className="text-muted-foreground/60">tech:</span> {svc.tech}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono text-xs text-foreground">{record.revIP}</td>
                    <td className="py-3 px-2">
                      <button className="p-1 hover:bg-secondary rounded">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
