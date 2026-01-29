export interface Technology {
  name: string;
  category: string;
  confidence: number;
  version?: string;
}

export interface ServerInfo {
  ip: string;
  hostname?: string;
  provider?: string;
  location?: string;
  asn?: string;
  organization?: string;
}

export interface DNSRecord {
  type: string;
  value: string;
  ttl?: number;
}

export interface DomainInfo {
  registrar?: string;
  createdDate?: string;
  expiryDate?: string;
  age?: string;
  nameservers: string[];
}

export interface HTTPHeader {
  name: string;
  value: string;
  status: 'good' | 'warning' | 'bad' | 'info';
  description?: string;
}

export interface PortResult {
  port: number;
  service: string;
  status: 'open' | 'closed' | 'filtered';
  risk: 'low' | 'medium' | 'high';
}

export interface RiskItem {
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendation?: string;
}

export interface SubdomainRecord {
  host: string;
  ip: string;
  asn: string;
  asnName: string;
  services: ServiceInfo[];
  revIP: number;
  location?: { lat: number; lng: number; country: string };
}

export interface ServiceInfo {
  port: string;
  service: string;
  title?: string;
  tech?: string;
}

export interface HostingNetwork {
  name: string;
  count: number;
}

export interface ServiceBanner {
  name: string;
  count: number;
}

export interface ReconResult {
  target: string;
  scanDate: string;
  technologies: Technology[];
  serverInfo: ServerInfo;
  dnsRecords: DNSRecord[];
  domainInfo: DomainInfo;
  httpHeaders: HTTPHeader[];
  ports: PortResult[];
  risks: RiskItem[];
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  subdomains?: SubdomainRecord[];
  hostingNetworks?: HostingNetwork[];
  serviceBanners?: ServiceBanner[];
}
