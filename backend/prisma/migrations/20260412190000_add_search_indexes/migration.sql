-- Enable extension for fast ILIKE/contains searches.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Name search indexes.
CREATE INDEX IF NOT EXISTS idx_states_state_name_trgm
  ON states USING GIN (state_name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_districts_district_name_trgm
  ON districts USING GIN (district_name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_subdistricts_subdistrict_name_trgm
  ON subdistricts USING GIN (subdistrict_name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_villages_village_name_trgm
  ON villages USING GIN (village_name gin_trgm_ops);

-- Parent filter + name sort/filter indexes.
CREATE INDEX IF NOT EXISTS idx_districts_state_code_name
  ON districts (state_code, district_name);

CREATE INDEX IF NOT EXISTS idx_subdistricts_district_code_name
  ON subdistricts (district_code, subdistrict_name);

CREATE INDEX IF NOT EXISTS idx_villages_subdistrict_code_name
  ON villages (subdistrict_code, village_name);
