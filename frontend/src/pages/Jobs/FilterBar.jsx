import "./FilterBar.css";

function FilterBar({
  search,
  setSearch,
  location,
  setLocation,
  jobType,
  setJobType,
}) {
  return (
    <div className="filter-bar">

      <input
        type="text"
        placeholder="🔍 Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        type="text"
        placeholder="📍 Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
      >
        <option value="">All Types</option>
        <option>Full Time</option>
        <option>Part Time</option>
        <option>Internship</option>
        <option>Remote</option>
      </select>

    </div>
  );
}

export default FilterBar;