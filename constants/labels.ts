export const labels = [
	{
		id: 0,
		name: 'Rác điện tử',
		img: require('../assets/e-waste-recycling.png'),
	},
	{
		id: 1,
		name: 'Rác vô cơ',
		img: require('../assets/wood.jpg'),
	},
	{
		id: 2,
		name: 'Rác hữu cơ',
		img: require('../assets/banana.jpg'),
	},
];

export const getLabel = (id: number) => {
	return labels.find((label) => label.id === id) || labels[0];
};
