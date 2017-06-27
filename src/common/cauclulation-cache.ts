import {CalculationCache} from './interfaces'

/**
 * Creates a [[CalculationCache]] object, useful for caching [[VNode]] trees.
 * In practice, caching of [[VNode]] trees is not needed, because achieving 60 frames per second is almost never a problem.
 * For more information, see [[CalculationCache]].
 *
 * @param <Result> The type of the value that is cached.
 */

export class Cache<Result> {
  public create(): CalculationCache<Result> {
    let cachedInputs: Object[] | undefined;
    let cachedOutcome: Result | undefined;
    return {

      invalidate: function () {
        cachedOutcome = undefined;
        cachedInputs = undefined;
      },

      result: function (inputs: Object[], calculation: () => Result) {
        if (cachedInputs) {
          for (let i = 0; i < inputs.length; i++) {
            if (cachedInputs[i] !== inputs[i]) {
              cachedOutcome = undefined;
            }
          }
        }
        if (!cachedOutcome) {
          cachedOutcome = calculation();
          cachedInputs = inputs;
        }
        return cachedOutcome;
      }
    };
  }
}