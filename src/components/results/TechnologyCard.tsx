import { Code2, Layers, Server, Database, Shield, Palette } from 'lucide-react';
import type { Technology } from '@/types/recon';

interface TechnologyCardProps {
  technologies: Technology[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'cms':
      return Layers;
    case 'framework':
      return Code2;
    case 'server':
      return Server;
    case 'database':
      return Database;
    case 'security':
      return Shield;
    case 'ui':
      return Palette;
    default:
      return Code2;
  }
};

export const TechnologyCard = ({ technologies }: TechnologyCardProps) => {
  const grouped = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, Technology[]>);

  return (
    <div className="cyber-card animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Code2 className="w-5 h-5 text-primary" />
        Technologies Detected
      </h3>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-muted-foreground text-sm">No technologies detected</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, techs]) => {
            const Icon = getCategoryIcon(category);
            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech, i) => (
                    <div
                      key={i}
                      className="bg-secondary px-3 py-2 rounded-lg border border-border flex items-center gap-2"
                    >
                      <span className="font-mono text-sm text-foreground">
                        {tech.name}
                        {tech.version && (
                          <span className="text-muted-foreground ml-1">v{tech.version}</span>
                        )}
                      </span>
                      <span className="text-xs text-primary">
                        {tech.confidence}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
