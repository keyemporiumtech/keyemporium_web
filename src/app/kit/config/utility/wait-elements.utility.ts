import { interval, Observable, of, timer } from 'rxjs';
import { endWith, filter, flatMap, takeUntil, takeWhile, delay, map } from 'rxjs/operators';

export class WaitElementsUtility {
	static waitWhileConditionIsOn(
		condition: boolean,
		refreshRateSec: number = 50,
		maxWaitTime: number = 3000,
	): Observable<any> {
		return interval(refreshRateSec).pipe(
			takeWhile(() => !condition),
			filter((x) => x === undefined),
			takeUntil(timer(maxWaitTime)),
			endWith(condition as any),
			flatMap((v) => {
				if (!condition) {
					throw new Error(`condition is never ready`);
				}
				return of(!condition);
			}),
		);
	}

	static waitWhileViewChildIsReady(
		parent: any,
		viewChildName: string,
		refreshRateSec: number = 50,
		maxWaitTime: number = 3000,
	): Observable<any> {
		return interval(refreshRateSec).pipe(
			takeWhile(() => !this.isDefined(parent[viewChildName])),
			filter((x) => x === undefined),
			takeUntil(timer(maxWaitTime)),
			endWith(parent[viewChildName]),
			flatMap((v) => {
				if (!parent[viewChildName]) {
					throw new Error(`ViewChild "${viewChildName}" is never ready`);
				}
				return of(!parent[viewChildName]);
			}),
		);
	}

	static waitWhileDomElIsReady(
		selector: any,
		refreshRateSec: number = 50,
		maxWaitTime: number = 3000,
	): Observable<any> {
		return interval(refreshRateSec).pipe(
			takeWhile(() => !document.querySelector(selector)),
			filter((x) => x === undefined),
			takeUntil(timer(maxWaitTime)),
			endWith(document.querySelector(selector)),
			flatMap((v) => {
				if (!document.querySelector(selector)) {
					throw new Error(`selector "${selector}" is not ready in DOM`);
				}
				return of(!document.querySelector(selector));
			}),
		);
	}

	static isDefined<T>(value: T | undefined | null): value is T {
		return <T>value !== undefined && <T>value !== null;
	}

	// MULTIPLE
	static waitWhileConditionsAreOn(
		conditions: boolean[],
		refreshRateSec: number = 50,
		maxWaitTime: number = 3000,
	): Observable<any> {
		return interval(refreshRateSec).pipe(
			takeWhile(() => !this.areOn(conditions)),
			filter((x) => x === undefined),
			takeUntil(timer(maxWaitTime)),
			endWith(this.areOn(conditions) as any),
			flatMap((v) => {
				if (!this.areOn(conditions)) {
					throw new Error(`conditions are not ready`);
				}
				return of(!this.areOn(conditions));
			}),
		);
	}

	static waitWhileViewChildsAreReady(
		parent: any,
		viewChildsName: string[],
		refreshRateSec: number = 50,
		maxWaitTime: number = 3000,
	): Observable<any> {
		return interval(refreshRateSec).pipe(
			takeWhile(() => !this.areDefined(parent, viewChildsName)),
			filter((x) => x === undefined),
			takeUntil(timer(maxWaitTime)),
			endWith(this.existsChilds(parent, viewChildsName) as any),
			flatMap((v) => {
				if (!this.existsChilds(parent, viewChildsName)) {
					throw new Error(`ViewChilds are never ready`);
				}
				return of(!this.existsChilds(parent, viewChildsName));
			}),
		);
	}

	static waitWhileDomElsAreReady(
		selectors: any[],
		refreshRateSec: number = 50,
		maxWaitTime: number = 3000,
	): Observable<any> {
		return interval(refreshRateSec).pipe(
			takeWhile(() => !this.existsSelectors(selectors)),
			filter((x) => x === undefined),
			takeUntil(timer(maxWaitTime)),
			endWith(this.existsSelectors(selectors) as any),
			flatMap((v) => {
				if (!this.existsSelectors(selectors)) {
					throw new Error(`selectors are not ready in DOM`);
				}
				return of(!this.existsSelectors(selectors));
			}),
		);
	}

	static areOn(conditions: boolean[]): boolean {
		conditions.forEach((el) => {
			if (!el) {
				return false;
			}
		});
		return true;
	}

	static areDefined(parent: any, childs: string[]): boolean {
		childs.forEach((el) => {
			if (!this.isDefined(parent[el])) {
				return false;
			}
		});
		return true;
	}

	static existsChilds(parent: any, childs: string[]): boolean {
		childs.forEach((el) => {
			if (!parent[el]) {
				return false;
			}
		});
		return true;
	}

	static existsSelectors(selectors: string[]): boolean {
		selectors.forEach((el) => {
			if (!document.querySelector(el)) {
				return false;
			}
		});
		return true;
	}

	// DELAY
	static createDelayForFunction(
		$obs: Observable<any>,
		fun: (res?: any) => any,
		wait?: number,
	): Observable<any> {
		return $obs.pipe(
			delay(wait ? wait : 1000),
			map((data) => {
				return fun(data) || true;
			}),
		);
	}
}
