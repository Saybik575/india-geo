const StateDropdown = ({ value, options, onChange, disabled = false }) => {
	return (
		<label className="field">
			<span className="field__label">State</span>
			<select
				className="field__control"
				value={value}
				onChange={onChange}
				disabled={disabled}
			>
				<option value="">Select a state</option>
				{options.map((state) => (
					<option key={state.state_code} value={state.state_code}>
						{state.state_name}
					</option>
				))}
			</select>
		</label>
	);
};

export default StateDropdown;
