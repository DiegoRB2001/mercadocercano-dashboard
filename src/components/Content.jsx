import { useEffect, useState } from "react";
import MarketCard from "./MarketCard";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { getMarkets } from "@/lib/firebase/firestore";

const Content = () => {
  const [markets, setMarkets] = useState([]);
  const [sortedMarkets, setSortedMarkets] = useState([]);
  const [searchFilter, setSearchFilter] = useState(["name"]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getMarkets().then((markets) => {
      setMarkets(markets);
      setSortedMarkets(markets);
    });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <Input
          type="text"
          placeholder={`Buscar ${
            searchFilter == "name"
              ? "nombre"
              : searchFilter == "state"
              ? "estado"
              : "ciudad"
          }`}
          isClearable
          onClear={() => {
            setSearchValue("");
            setSortedMarkets(markets);
          }}
          className="p-5"
          value={searchValue}
          onChange={(e) =>
            setSortedMarkets(() => {
              {
                setSearchValue(e.target.value);
                if (e.target.value === "") return markets;
                return markets.filter((market) => {
                  const value =
                    searchFilter == "name"
                      ? market.data()[searchFilter]
                      : market.data().location[searchFilter];
                  return value.toLowerCase().includes(e.target.value);
                });
              }
            })
          }
        />
        <Select
          aria-label="Tipo de busqueda"
          value={searchFilter}
          label="Tipo de búsqueda"
          className="max-w-xs p-5 pl-0"
          selectedKeys={searchFilter}
          selectionMode="single"
          disallowEmptySelection
          onChange={(e) => {
            setSearchValue("");
            setSortedMarkets(markets);
            setSearchFilter([e.target.value]);
          }}
        >
          <SelectItem defaultChecked key={"name"} value={"name"}>
            Nombre
          </SelectItem>
          <SelectItem key={"state"} value={"state"}>
            Estado
          </SelectItem>
          <SelectItem key={"city"} value={"city"}>
            Ciudad
          </SelectItem>
        </Select>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 p-5">
        {sortedMarkets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>
    </div>
  );
};

export default Content;
