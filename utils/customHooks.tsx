import { DependencyList, EffectCallback, useEffect, useRef } from "react";

/**
 * useUpdateEffect
 * @param {EffectCallback} effect
 * @param {DependencyList} deps
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
    const isMountedRef = useRef(false);

    useEffect(() => {
        if (!isMountedRef.current) {
            isMountedRef.current = true;
            return;
        }
        return effect();
    }, deps);
}
