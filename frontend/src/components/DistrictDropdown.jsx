const DistrictDropdown = ({ value, options, onChange, disabled = false }) => {
	return (
		<label className="field">
			<span className="field__label">District</span>
			<select
				className="field__control"
				value={value}
				onChange={onChange}
				disabled={disabled}
			>
				<option value="">Select a district</option>
				{options.map((district) => (
					<option key={district.district_code} value={district.district_code}>
						{district.district_name}
					</option>
				))}
			</select>
		</label>
	);
};

export default DistrictDropdown;
