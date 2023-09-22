import renderer from 'react-test-renderer';

import AppHeader from '../../components/app-header';

describe('<AppHeader />', () => {
	it('should be render', () => {
		const tree = renderer
			.create(<AppHeader />)
			.toJSON() as renderer.ReactTestRendererJSON;

		expect(tree).toMatchSnapshot();
	});
});
