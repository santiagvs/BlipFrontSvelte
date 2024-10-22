export interface Message {
	content: string;
	id: string;
	from: string;
	to: string;
	metadata: {
		'#date_processed': string;
		date_created: string;
	};
}

export interface Contact {
	identity: string;
	name: string;
	group: string;
	lastMessageDate: string;
	lastUpdateDate: string;
	gender: string;
	extras: {};
}

export const formatDate = (date: string) => {
	return new Date(parseInt(date)).toLocaleString('pt-BR');
};
