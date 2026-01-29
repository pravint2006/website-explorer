import { useState } from 'react';
import { SearchInput } from '@/components/SearchInput';
import { ScanProgress } from '@/components/ScanProgress';
import { ResultsTabs } from '@/components/ResultsTabs';
import { ExportButtons } from '@/components/ExportButtons';
import { Disclaimer } from '@/components/Disclaimer';
import { generateMockResult } from '@/lib/mockData';
import type { ReconResult } from '@/types/recon';
import { Shield, Radar, ArrowLeft } from 'lucide-react';

const SCAN_STEPS = [
  'Resolving target...',
  'Gathering server information...',
  'Querying DNS records...',
  'Detecting technologies...',
  'Analyzing HTTP headers...',
  'Scanning common ports...',
  'Generating risk assessment...',
];

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<ReconResult | null>(null);

  const handleSearch = async (target: string) => {
    setIsScanning(true);
    setCurrentStep(0);
    setResult(null);

    // Simulate scanning progress
    for (let i = 0; i < SCAN_STEPS.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300));
      setCurrentStep(i + 1);
    }

    // Generate mock result
    const mockResult = generateMockResult(target);
    setResult(mockResult);
    setIsScanning(false);
  };

  const handleReset = () => {
    setResult(null);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Radar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ReconScope</h1>
                <p className="text-xs text-muted-foreground">Passive Reconnaissance Tool</p>
              </div>
            </div>
            {result && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                New Scan
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!result && !isScanning && (
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Educational & Research Tool
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Discover Website
              <span className="text-primary"> Intelligence</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Analyze any domain or IP address to uncover technologies, server details, 
              DNS records, security headers, and potential vulnerabilities.
            </p>
          </div>
        )}

        {/* Search Input */}
        {!result && !isScanning && (
          <div className="mb-8 animate-fade-in-delay-1">
            <SearchInput onSearch={handleSearch} isLoading={isScanning} />
          </div>
        )}

        {/* Disclaimer */}
        {!result && !isScanning && (
          <div className="mt-8 animate-fade-in-delay-2">
            <Disclaimer />
          </div>
        )}

        {/* Features Grid */}
        {!result && !isScanning && (
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-delay-3">
            <FeatureCard
              title="Technology Detection"
              description="Identify CMS, frameworks, servers, and databases powering any website"
              icon="🔍"
            />
            <FeatureCard
              title="Security Analysis"
              description="Review HTTP headers, SSL configuration, and security posture"
              icon="🛡️"
            />
            <FeatureCard
              title="Infrastructure Intel"
              description="Discover hosting providers, DNS configuration, and network details"
              icon="🌐"
            />
          </div>
        )}

        {/* Scanning Progress */}
        {isScanning && (
          <div className="py-12">
            <ScanProgress currentStep={currentStep} steps={SCAN_STEPS} />
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <span className="font-mono text-primary">{result.target}</span>
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Scanned on {new Date(result.scanDate).toLocaleString()}
                </p>
              </div>
              <ExportButtons result={result} />
            </div>

            {/* Results Tabs */}
            <ResultsTabs result={result} />

            {/* Footer Disclaimer */}
            <div className="pt-8">
              <Disclaimer />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            This tool uses publicly available data only. No active exploitation or intrusive scanning is performed.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <div className="cyber-card text-center">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default Index;
