import { ImageSourcePropType } from 'react-native';

export interface Label {
	id: number;
	name: string;
	img: ImageSourcePropType;
}

export const labels: Label[] = [
	{
		id: 0,
		name: 'Rác điện tử',
		img: require('../assets/e-waste-recycling.png'),
	},
	{
		id: 1,
		name: 'Rác vô cơ',
		img: require('../assets/inorganic-waste.png'),
	},
	{
		id: 2,
		name: 'Rác hữu cơ',
		img: require('../assets/food-waste.png'),
	},
];

export const getLabel = (id: number) => {
	return labels.find((label) => label.id === id) || labels[0];
};
