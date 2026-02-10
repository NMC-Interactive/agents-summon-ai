import VoteButtons from './VoteButtons';
import { Download, Star, Github, Terminal } from 'lucide-react';

interface AgentCardProps {
  agent: {
    slug: string;
    data: {
      title: string;
      description: string;
      author: string;
      category: string;
      tags: string[];
      repo: string;
      downloads: number;
      rating: number;
      votes: number;
      featured?: boolean;
      install_command: string;
    };
  };
  index: number;
}

export default function AgentCard({ agent, index }: AgentCardProps) {
  const { title, description, author, category, tags, repo, downloads, rating, votes, featured, install_command } = agent.data;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <article className={`bg-dark-900 border border-dark-800 rounded-xl p-4 hover:border-dark-700 transition group ${
      featured ? 'ring-2 ring-primary-500/20' : ''
    }`}>
      <div className="flex gap-4">
        {/* Vote Buttons */}
        <div className="flex-shrink-0">
          <VoteButtons initialVotes={votes} agentSlug={agent.slug} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {featured && (
                  <span className="bg-primary-500/10 text-primary-400 text-xs px-2 py-0.5 rounded-full font-medium">
                    Featured
                  </span>
                )}
                <span className="text-xs text-dark-500">#{index + 1}</span>
                <a href={`/agents/${agent.slug}`} className="text-lg font-semibold text-white hover:text-primary-400 transition line-clamp-1">
                  {title}
                </a>
              </div>
              
              <p className="text-dark-400 text-sm line-clamp-2 mb-3">{description}</p>
              
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="text-dark-500">by <span className="text-dark-300">{author}</span></span>
                
                <span className="bg-dark-800 text-dark-300 px-2 py-1 rounded">{category}</span>
                
                <div className="flex items-center gap-1 text-dark-400">
                  <Download size={14} />
                  <span>{formatNumber(downloads)}</span>
                </div>
                
                {rating > 0 && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span>{rating.toFixed(1)}</span>
                  </div>
                )}
                
                <a 
                  href={repo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-dark-400 hover:text-white transition"
                >
                  <Github size={14} />
                  <span>Repo</span>
                </a>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.slice(0, 4).map((tag) => (
                  <a
                    key={tag}
                    href={`/tags/${tag}`}
                    className="text-xs bg-dark-800/50 text-dark-400 px-2 py-1 rounded hover:bg-dark-800 transition"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>

            {/* Install Command Preview */}
            <div className="hidden lg:block flex-shrink-0 w-64">
              <div className="bg-dark-950 rounded-lg p-3 border border-dark-800">
                <div className="flex items-center gap-2 text-xs text-dark-500 mb-2">
                  <Terminal size={12} />
                  <span>Install</span>
                </div>
                <code className="text-xs text-primary-300 font-mono break-all">
                  {install_command.length > 50 ? install_command.slice(0, 50) + '...' : install_command}
                </code>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}