const SubdistrictDropdown = ({ value, options, onChange, disabled = false }) => {
	return (
		<label className="field">
			<span className="field__label">Subdistrict</span>
			<select
				className="field__control"
				value={value}
				onChange={onChange}
				disabled={disabled}
			>
				<option value="">Select a subdistrict</option>
				{options.map((subdistrict) => (
					<option key={subdistrict.subdistrict_code} value={subdistrict.subdistrict_code}>
						{subdistrict.subdistrict_name}
					</option>
				))}
			</select>
		</label>
	);
};

export default SubdistrictDropdown;
