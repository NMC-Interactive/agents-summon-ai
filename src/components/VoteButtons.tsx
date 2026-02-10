import { useState } from 'react';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';

interface VoteButtonsProps {
  initialVotes: number;
  initialRating?: number;
  agentSlug: string;
}

export default function VoteButtons({ initialVotes, initialRating = 0, agentSlug }: VoteButtonsProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleUpvote = () => {
    if (userVote === 'up') {
      setVotes(votes - 1);
      setUserVote(null);
    } else {
      setVotes(userVote === 'down' ? votes + 2 : votes + 1);
      setUserVote('up');
    }
    // TODO: Persist to backend/localStorage
    localStorage.setItem(`vote-${agentSlug}`, userVote === 'up' ? '' : 'up');
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      setVotes(votes + 1);
      setUserVote(null);
    } else {
      setVotes(userVote === 'up' ? votes - 2 : votes - 1);
      setUserVote('down');
    }
    localStorage.setItem(`vote-${agentSlug}`, userVote === 'down' ? '' : 'down');
  };

  const formatVotes = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={handleUpvote}
        className={`p-1 rounded transition ${
          userVote === 'up'
            ? 'text-orange-500 bg-orange-500/10'
            : 'text-dark-400 hover:text-orange-500 hover:bg-dark-800'
        }`}
        aria-label="Upvote"
      >
        <ArrowBigUp size={24} fill={userVote === 'up' ? 'currentColor' : 'none'} />
      </button>
      
      <span className={`font-bold text-sm ${
        votes > 0 ? 'text-orange-500' : votes < 0 ? 'text-blue-500' : 'text-dark-400'
      }`}>
        {formatVotes(votes)}
      </span>
      
      <button
        onClick={handleDownvote}
        className={`p-1 rounded transition ${
          userVote === 'down'
            ? 'text-blue-500 bg-blue-500/10'
            : 'text-dark-400 hover:text-blue-500 hover:bg-dark-800'
        }`}
        aria-label="Downvote"
      >
        <ArrowBigDown size={24} fill={userVote === 'down' ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}