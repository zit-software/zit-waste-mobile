import renderer from 'react-test-renderer';

import Button, { ButtonProps } from '../../components/button';

describe('<Button />', () => {
	let defaultProps: ButtonProps;

	beforeAll(() => {
		defaultProps = {
			title: 'Button',
		};
	});

	it('should be render', () => {
		const tree = renderer
			.create(<Button {...defaultProps} />)
			.toJSON() as renderer.ReactTestRendererJSON;

		expect(tree).toMatchSnapshot();
	});

	it('should be render with icon', () => {
		const tree = renderer
			.create(<Button {...defaultProps} icon='icon' />)
			.toJSON() as renderer.ReactTestRendererJSON;

		expect(tree).toMatchSnapshot();
	});

	it('should pressable', () => {
		let pressed = false;

		function handlePress() {
			pressed = true;
		}

		const tree = renderer.create(
			<Button {...defaultProps} onPress={handlePress} />,
		);

		tree.root.props.onPress();

		expect(pressed).toBeTruthy();
	});
});
