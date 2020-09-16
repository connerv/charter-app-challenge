function SelectGenre({ genreSelected, restaurants }) {
  const genreSet = new Set();
  restaurants.forEach((element) => {
    let res = element.genre.split(",");
    res.forEach((genre) => {
      genreSet.add(genre);
    });
  });
  const genreArray = Array.from(genreSet);
  return (
    <select
      defaultValue="all"
      className={"custom-select custom-select-sm ml-2 w-50"}
      onChange={genreSelected}
    >
      <option val="all">all</option>
      {genreArray.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}

export default SelectGenre;
