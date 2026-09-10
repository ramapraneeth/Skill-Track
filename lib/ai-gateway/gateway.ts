/**
 * AI/ML Service Gateway
 * Enforces production reliability, timeout boundaries (2500ms max), circuit breaker resiliency,
 * and PII scrubbing across all analytical model requests.
 */

import { DataSanitizer } from './sanitizer';

export interface CircuitBreakerOptions {
  failureThreshold?: number;
  resetTimeoutMs?: number;
  requestTimeoutMs?: number;
}

export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export class AIGateway {
  private static state: CircuitState = 'CLOSED';
  private static failureCount = 0;
  private static lastFailureTime = 0;

  private static failureThreshold = 3;
  private static resetTimeoutMs = 30000; // 30 seconds
  private static defaultTimeoutMs = 2500; // 2.5 seconds per SIH requirement

  /**
   * Current circuit state
   */
  static getCircuitState(): CircuitState {
    const now = Date.now();
    if (this.state === 'OPEN' && now - this.lastFailureTime > this.resetTimeoutMs) {
      this.state = 'HALF_OPEN';
    }
    return this.state;
  }

  /**
   * Executes an asynchronous AI/ML or LLM operation wrapped in a timeout and circuit breaker.
   * If the circuit is OPEN, or if the operation times out or throws an error, the deterministic fallback is invoked.
   */
  static async executeWithFallback<T>(
    operationName: string,
    operation: () => Promise<T>,
    fallback: () => Promise<T> | T,
    timeoutMs: number = this.defaultTimeoutMs
  ): Promise<{ data: T; usedFallback: boolean; fallbackReason?: string }> {
    const currentState = this.getCircuitState();

    if (currentState === 'OPEN') {
      const fallbackResult = await Promise.resolve(fallback());
      return {
        data: fallbackResult,
        usedFallback: true,
        fallbackReason: `Circuit breaker is OPEN for '${operationName}'. Invoked deterministic fallback.`,
      };
    }

    // Execute with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const operationPromise = operation();
      const timeoutPromise = new Promise<never>((_, reject) => {
        controller.signal.addEventListener('abort', () => {
          reject(new Error(`Operation '${operationName}' timed out after ${timeoutMs}ms.`));
        });
      });

      const result = await Promise.race([operationPromise, timeoutPromise]);
      clearTimeout(timeoutId);

      // Successful execution resets failure metrics
      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
      }
      this.failureCount = 0;

      return {
        data: result,
        usedFallback: false,
      };
    } catch (error: any) {
      clearTimeout(timeoutId);
      this.handleFailure(operationName, error);

      // Execute deterministic fallback
      const fallbackResult = await Promise.resolve(fallback());
      return {
        data: fallbackResult,
        usedFallback: true,
        fallbackReason: error?.message || `Failure during '${operationName}'`,
      };
    }
  }

  private static handleFailure(operationName: string, error: any) {
    this.failureCount += 1;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      console.warn(
        `[AIGateway] Circuit tripped to OPEN for '${operationName}' after ${this.failureCount} consecutive failures.`
      );
    }
  }

  /**
   * Sanitizes feature payloads prior to model inference
   */
  static sanitizePayload<T>(payload: T): T {
    return DataSanitizer.anonymizePayload(payload);
  }
}
