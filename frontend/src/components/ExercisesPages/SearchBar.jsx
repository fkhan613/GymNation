/* eslint-disable react/prop-types */
import { useState } from "react";
import { Select, Option, Input, Button } from "@material-tailwind/react";
import {
  bodyParts,
  targetMuscles,
  equipment,
} from "../../config/exerciseSearchCats";

const SearchBar = ({searchTerm="", selectTerm="name", category="" }) => {
  const [search, setSearch] = useState(searchTerm);
  const [select, setSelect] = useState(selectTerm);
  const [selectCategory, setSelectCategory] = useState(category);

  return (
    <div className="relative flex gap-6 flex-wrap items-center justify-center w-full">
      <Select
        label="Search Exercises By:"
        value={select}
        onChange={(e) => {
          setSelect(e);
        }}
        color="indigo"
        containerProps={{ className: "w-full sm:w-1/4" }}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <Option value="name">Name</Option>
        <Option value="machine">Machine</Option>
        <Option value="body-part">Body Part</Option>
        <Option value="target-muscle">Target Muscle</Option>
      </Select>

      {select !== "name" ? (
        <Select
          label="Select a Category"
          value={selectCategory}
          onChange={(e) => setSelectCategory(e)}
          color="indigo"
          containerProps={{ className: "w-full sm:w-1/4" }}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          {select === "body-part"
            ? bodyParts.map((part) => (
                <Option key={part} value={part}>
                  {part}
                </Option>
              ))
            : select === "target-muscle"
            ? targetMuscles.map((muscle) => (
                <Option key={muscle} value={muscle}>
                  {muscle}
                </Option>
              ))
            : equipment.map((equip) => (
                <Option key={equip} value={equip}>
                  {equip}
                </Option>
              ))}
        </Select>
      ) : (
        <Input
          type="search"
          label="Search Term"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-30 min-w-0"
          color="indigo"
          containerProps={{ className: "w-full sm:w-1/4" }}
        />
      )}

      <Button
        size="sm"
        color={(search || selectCategory) ? "indigo" : "blue-gray"}
        disabled={(search || selectCategory) ? false : true}
        className="w-full sm:w-auto sm:mt-0"
        onClick={() =>
          (window.location.href = `${window.location.pathname}?search-term=${search}&select=${select}&select-category=${selectCategory}`)
        }
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
