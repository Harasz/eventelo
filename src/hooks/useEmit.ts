import { EventeloSource } from "../eventeloSource";
import { EmitFunction } from "../eventeloSource.interfaces";

export interface UseEmitReturnType {
  emit: EmitFunction;
}

export function useEmit(): UseEmitReturnType {
  const emit = EventeloSource.emit;

  return { emit };
}
