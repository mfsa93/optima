import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import Filters from '../../app/views/quotations/filters';
import Select from '../../app/components/form_select';
import sinon from 'sinon';

describe('quotations filters component', () => {
	it('should change query', () => {
		const onChange = sinon.spy();
		let wrapper = shallow(<Filters onChange={onChange} />);
		wrapper.find('.input-query').simulate('change', {currentTarget: {value: 3030}});
		expect(onChange.callCount).toBe(1);
		expect(wrapper.state().query.query).toBe(3030);
	})

})
  