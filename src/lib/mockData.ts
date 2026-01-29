import type { ReconResult } from '@/types/recon';

export const generateMockResult = (target: string): ReconResult => {
  const isIP = /^\d+\.\d+\.\d+\.\d+$/.test(target);
  
  return {
    target,
    scanDate: new Date().toISOString(),
    technologies: [
      { name: 'Nginx', category: 'Server', confidence: 95, version: '1.24' },
      { name: 'React', category: 'Framework', confidence: 90, version: '18' },
      { name: 'Cloudflare', category: 'CDN', confidence: 100 },
      { name: 'Node.js', category: 'Runtime', confidence: 75 },
      { name: 'PostgreSQL', category: 'Database', confidence: 60 },
      { name: 'Tailwind CSS', category: 'UI', confidence: 85 },
    ],
    serverInfo: {
      ip: isIP ? target : '104.21.32.128',
      hostname: isIP ? undefined : target,
      provider: 'Cloudflare, Inc.',
      location: 'San Francisco, CA, USA',
      asn: 'AS13335',
      organization: 'Cloudflare, Inc.',
    },
    dnsRecords: [
      { type: 'A', value: '104.21.32.128', ttl: 300 },
      { type: 'A', value: '172.67.182.31', ttl: 300 },
      { type: 'AAAA', value: '2606:4700:3031::6815:2080', ttl: 300 },
      { type: 'MX', value: 'mx1.improvmx.com', ttl: 3600 },
      { type: 'MX', value: 'mx2.improvmx.com', ttl: 3600 },
      { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all', ttl: 3600 },
      { type: 'NS', value: 'ns1.cloudflare.com', ttl: 86400 },
      { type: 'NS', value: 'ns2.cloudflare.com', ttl: 86400 },
    ],
    domainInfo: {
      registrar: 'Cloudflare, Inc.',
      createdDate: '2020-03-15',
      expiryDate: '2025-03-15',
      age: '4 years, 10 months',
      nameservers: ['ns1.cloudflare.com', 'ns2.cloudflare.com'],
    },
    httpHeaders: [
      { name: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline'", status: 'good', description: 'CSP is configured but could be stricter' },
      { name: 'X-Frame-Options', value: 'SAMEORIGIN', status: 'good', description: 'Prevents clickjacking attacks' },
      { name: 'X-Content-Type-Options', value: 'nosniff', status: 'good', description: 'Prevents MIME type sniffing' },
      { name: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains', status: 'good', description: 'HSTS is properly configured' },
      { name: 'X-XSS-Protection', value: 'Not Set', status: 'warning', description: 'Legacy header, CSP is preferred' },
      { name: 'Referrer-Policy', value: 'strict-origin-when-cross-origin', status: 'good', description: 'Good balance of privacy and functionality' },
      { name: 'Permissions-Policy', value: 'Not Set', status: 'warning', description: 'Consider setting to restrict browser features' },
      { name: 'Server', value: 'cloudflare', status: 'info' },
      { name: 'Content-Type', value: 'text/html; charset=UTF-8', status: 'info' },
      { name: 'Cache-Control', value: 'public, max-age=3600', status: 'info' },
    ],
    ports: [
      { port: 80, service: 'HTTP', status: 'open', risk: 'low' },
      { port: 443, service: 'HTTPS', status: 'open', risk: 'low' },
      { port: 22, service: 'SSH', status: 'filtered', risk: 'medium' },
      { port: 21, service: 'FTP', status: 'closed', risk: 'medium' },
      { port: 25, service: 'SMTP', status: 'closed', risk: 'low' },
      { port: 3306, service: 'MySQL', status: 'closed', risk: 'high' },
      { port: 5432, service: 'PostgreSQL', status: 'closed', risk: 'high' },
      { port: 8080, service: 'HTTP Alt', status: 'closed', risk: 'low' },
    ],
    risks: [
      {
        category: 'Missing Security Header',
        description: 'Permissions-Policy header is not set',
        severity: 'low',
        recommendation: 'Add Permissions-Policy header to restrict browser features',
      },
      {
        category: 'Information Disclosure',
        description: 'Server version information is exposed in headers',
        severity: 'low',
        recommendation: 'Consider hiding server version information',
      },
      {
        category: 'Security Header',
        description: 'X-XSS-Protection header not set (deprecated but still useful)',
        severity: 'low',
        recommendation: 'While CSP is preferred, this header can help older browsers',
      },
    ],
    overallRisk: 'low',
  };
};
