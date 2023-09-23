import { ImageSourcePropType } from 'react-native';

export interface Label {
	id: number;
	name: string;
	img: string;
}

export const labels: Label[] = [
	{
		id: 0,
		name: 'Rác điện tử',
		img: require('../assets/lotties/electric.json'),
	},
	{
		id: 1,
		name: 'Rác vô cơ',
		img: require('../assets/lotties/inorganic.json'),
	},
	{
		id: 2,
		name: 'Rác hữu cơ',
		img: require('../assets/lotties/organic.json'),
	},
];

export const getLabel = (id: number) => {
	return labels.find((label) => label.id === id) || labels[0];
};
