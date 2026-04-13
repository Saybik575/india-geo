const VillageList = ({ villages, loading, emptyMessage = "Choose a subdistrict to see villages." }) => {
	if (loading) {
		return <p className="text-sm text-slate-600">Loading villages...</p>;
	}

	if (!villages.length) {
		return <div className="text-sm text-slate-500">{emptyMessage}</div>;
	}

	return (
		<ul className="max-h-64 space-y-2 overflow-y-auto pr-1">
			{villages.map((village) => {
				const villageCode = village.village_code ?? village.code;
				const villageName = village.village_name ?? village.name;

				return (
					<li
						key={villageCode}
						className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:bg-slate-100"
					>
						<span className="font-medium text-slate-900">{villageName}</span>
						<span className="text-sm text-slate-500">{villageCode}</span>
					</li>
				);
			})}
		</ul>
	);
};

export default VillageList;
