import { Shield, AlertTriangle, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import type { RiskItem, ReconResult } from '@/types/recon';

interface RiskSummaryCardProps {
  risks: RiskItem[];
  overallRisk: ReconResult['overallRisk'];
}

const getSeverityIcon = (severity: RiskItem['severity']) => {
  switch (severity) {
    case 'low':
      return <CheckCircle2 className="w-4 h-4 text-success" />;
    case 'medium':
      return <AlertTriangle className="w-4 h-4 text-warning" />;
    case 'high':
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    case 'critical':
      return <XCircle className="w-4 h-4 text-destructive" />;
  }
};

const getSeverityClass = (severity: RiskItem['severity']) => {
  switch (severity) {
    case 'low':
      return 'border-l-success bg-success/5';
    case 'medium':
      return 'border-l-warning bg-warning/5';
    case 'high':
      return 'border-l-destructive bg-destructive/5';
    case 'critical':
      return 'border-l-destructive bg-destructive/10';
  }
};

const getOverallRiskStyle = (risk: ReconResult['overallRisk']) => {
  switch (risk) {
    case 'low':
      return { bg: 'bg-success/20', text: 'text-success', label: 'Low Risk' };
    case 'medium':
      return { bg: 'bg-warning/20', text: 'text-warning', label: 'Medium Risk' };
    case 'high':
      return { bg: 'bg-destructive/20', text: 'text-destructive', label: 'High Risk' };
    case 'critical':
      return { bg: 'bg-destructive/30', text: 'text-destructive', label: 'Critical Risk' };
  }
};

export const RiskSummaryCard = ({ risks, overallRisk }: RiskSummaryCardProps) => {
  const style = getOverallRiskStyle(overallRisk);
  
  const counts = {
    critical: risks.filter(r => r.severity === 'critical').length,
    high: risks.filter(r => r.severity === 'high').length,
    medium: risks.filter(r => r.severity === 'medium').length,
    low: risks.filter(r => r.severity === 'low').length,
  };

  return (
    <div className="cyber-card-glow animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        Risk Assessment
      </h3>

      {/* Overall Risk Score */}
      <div className={`${style.bg} rounded-xl p-6 mb-6 text-center`}>
        <div className={`text-3xl font-bold ${style.text} mb-2`}>
          {style.label}
        </div>
        <p className="text-sm text-muted-foreground">
          Based on {risks.length} finding{risks.length !== 1 ? 's' : ''}
        </p>
        
        {/* Severity Breakdown */}
        <div className="flex justify-center gap-6 mt-4">
          {counts.critical > 0 && (
            <div className="text-center">
              <div className="text-xl font-bold text-destructive">{counts.critical}</div>
              <div className="text-xs text-muted-foreground">Critical</div>
            </div>
          )}
          {counts.high > 0 && (
            <div className="text-center">
              <div className="text-xl font-bold text-destructive">{counts.high}</div>
              <div className="text-xs text-muted-foreground">High</div>
            </div>
          )}
          {counts.medium > 0 && (
            <div className="text-center">
              <div className="text-xl font-bold text-warning">{counts.medium}</div>
              <div className="text-xs text-muted-foreground">Medium</div>
            </div>
          )}
          {counts.low > 0 && (
            <div className="text-center">
              <div className="text-xl font-bold text-success">{counts.low}</div>
              <div className="text-xs text-muted-foreground">Low</div>
            </div>
          )}
        </div>
      </div>

      {/* Individual Findings */}
      {risks.length > 0 && (
        <div className="space-y-3">
          {risks.map((risk, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border-l-4 ${getSeverityClass(risk.severity)}`}
            >
              <div className="flex items-start gap-3">
                {getSeverityIcon(risk.severity)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground text-sm">
                      {risk.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {risk.description}
                  </p>
                  {risk.recommendation && (
                    <p className="text-xs text-primary mt-2">
                      💡 {risk.recommendation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
