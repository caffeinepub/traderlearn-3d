import { useState } from 'react';
import { useMarkModuleComplete } from '../hooks/useQueries';
import { useIsModuleComplete } from '../hooks/useQueries';
import { CheckCircle2, Loader2, Trophy } from 'lucide-react';

interface CompleteButtonProps {
  moduleId: string;
}

export default function CompleteButton({ moduleId }: CompleteButtonProps) {
  const { data: isComplete, isLoading: checkLoading } = useIsModuleComplete(moduleId);
  const { mutate: markComplete, isPending } = useMarkModuleComplete();
  const [justCompleted, setJustCompleted] = useState(false);

  const handleComplete = () => {
    markComplete(moduleId, {
      onSuccess: () => {
        setJustCompleted(true);
      },
    });
  };

  if (checkLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 text-gold animate-spin" />
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="flex flex-col items-center gap-3 py-8">
        <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-gold/10 gold-border">
          <Trophy className="w-5 h-5 text-gold" />
          <span className="font-semibold text-gold">Module Completed!</span>
          <CheckCircle2 className="w-5 h-5 text-gold" />
        </div>
        <p className="text-sm text-muted-foreground">
          Great work! You've mastered this module.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-8">
      {justCompleted ? (
        <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-gold/10 gold-border animate-pulse-gold">
          <Trophy className="w-5 h-5 text-gold" />
          <span className="font-semibold text-gold">Congratulations! Module Complete!</span>
        </div>
      ) : (
        <>
          <button
            onClick={handleComplete}
            disabled={isPending}
            className="flex items-center gap-3 px-8 py-3 rounded-lg font-semibold text-background gradient-gold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed gold-glow"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving Progress...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Mark as Complete
              </>
            )}
          </button>
          <p className="text-xs text-muted-foreground">
            Finished studying this module? Mark it complete to track your progress.
          </p>
        </>
      )}
    </div>
  );
}
