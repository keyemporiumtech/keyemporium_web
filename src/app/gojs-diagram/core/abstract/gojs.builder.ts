import * as go from 'gojs';
export abstract class GojsBuilder {
	abstract make(divId: string, properties?: any): go.Diagram;
	abstract makeProperties(properties?: any): void;
	abstract resetProperties(): void;
}
