const API_BASE_FROM_ENV = (import.meta.env.VITE_API_URL ?? "").trim();
// Default to Vercel rewrite path when env var is missing.
const BASE_URL = (API_BASE_FROM_ENV || "/api/v1").replace(/\/+$/, "");
const API_KEY = import.meta.env.VITE_API_KEY ?? "";

const buildHeaders = () => {
	const headers = {
		"Content-Type": "application/json",
	};

	  if (API_KEY.trim()) {
		headers["x-api-key"] = API_KEY;
	}

	return headers;
};

const fetchJson = async (path) => {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	const response = await fetch(`${BASE_URL}${normalizedPath}`, {
		headers: buildHeaders(),
	});

	if (!response.ok) {
		const contentType = response.headers.get("content-type") || "";

		if (contentType.includes("application/json")) {
			const payload = await response.json();
			throw new Error(payload.error || `Request failed with status ${response.status}`);
		}

		const message = await response.text();
		throw new Error(message || `Request failed with status ${response.status}`);
	}

	return response.json();
};

const unwrapData = async (path) => {
	const payload = await fetchJson(path);

	if (payload?.success === false) {
		throw new Error(payload.error || "Request failed");
	}

	return payload?.data ?? payload;
};

const unwrapPage = async (path) => {
	const payload = await fetchJson(path);

	if (payload?.success === false) {
		throw new Error(payload.error || "Request failed");
	}

	return {
		data: payload?.data ?? [],
		total: payload?.meta?.total ?? payload?.meta?.count ?? 0,
		page: payload?.meta?.page ?? 1,
		totalPages: payload?.meta?.totalPages ?? 1,
	};
};

export const getStates = (name = "") => {
	const search = new URLSearchParams();

	if (name.trim()) {
		search.set("name", name.trim());
	}

	const query = search.toString();
	return unwrapData(`/states${query ? `?${query}` : ""}`);
};

export const getStateVillageCounts = (limit = 10) => {
	const search = new URLSearchParams({
		limit: String(limit),
	});

	return unwrapData(`/states/village-counts?${search.toString()}`);
};

export const getDistricts = (stateCode, name = "") => {
	const search = new URLSearchParams();

	if (name.trim()) {
		search.set("name", name.trim());
	}

	const query = search.toString();
	return unwrapData(`/states/${stateCode}/districts${query ? `?${query}` : ""}`);
};

export const getSubdistricts = (districtCode, name = "") => {
	const search = new URLSearchParams();

	if (name.trim()) {
		search.set("name", name.trim());
	}

	const query = search.toString();
	return unwrapData(`/districts/${districtCode}/subdistricts${query ? `?${query}` : ""}`);
};

export const getVillages = (subdistrictCode, page = 1, limit = 20, name = "") => {
	const search = new URLSearchParams({
		subdistrict_code: String(subdistrictCode),
		page: String(page),
		limit: String(limit),
	});

	if (name.trim()) {
		search.set("name", name.trim());
	}

	return unwrapPage(`/villages?${search.toString()}`);
};

export const searchVillages = (query) => {
	const normalizedQuery = query.trim();
	return unwrapData(`/villages/search?name=${encodeURIComponent(normalizedQuery)}`);
};

export const searchDistricts = (query) => {
	const normalizedQuery = query.trim();
	return unwrapData(`/districts/search?name=${encodeURIComponent(normalizedQuery)}`);
};

export const searchSubdistricts = (query) => {
	const normalizedQuery = query.trim();
	return unwrapData(`/subdistricts/search?name=${encodeURIComponent(normalizedQuery)}`);
};
