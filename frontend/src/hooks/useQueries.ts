import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useAllModuleProgress() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[string, boolean]>>({
    queryKey: ['moduleProgress'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllModuleProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsModuleComplete(moduleId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['moduleComplete', moduleId],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isModuleComplete(moduleId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMarkModuleComplete() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (moduleId: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.markModuleComplete(moduleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moduleProgress'] });
      queryClient.invalidateQueries({ queryKey: ['moduleComplete'] });
    },
  });
}
