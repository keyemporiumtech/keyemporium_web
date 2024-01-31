export interface ChatbotMessageInterface {
	type: 'IN' | 'OUT' | 'ERROR';
	value: string;
	payload?: any;
}
