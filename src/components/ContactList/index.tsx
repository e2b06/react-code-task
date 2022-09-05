import React, { useState, useEffect, useRef } from "react";
import { ContactItem } from "../ContactItem";
import { SelectItem, OnSearchChangeType } from "./SelectItem";
import { Loading } from "../Loading";

interface SearchInputType {
  [name: string]: string;
  status: string;
  gender: string;
}

export const ContactList: React.FC<{}> = () => {
  const [contactList, SetContactList] = useState([] as any[]);
  const [searchInput, SetSearchInput] = useState({
    name: "",
    status: "",
    gender: "",
  } as SearchInputType);
  const [isLoading, SetIsloading] = useState(false);

  //  contact list by fetching
  const contactListRef = useRef<null | any[]>(null);

  const [isBottom, SetIsBottom] = useState(true);

  const [currentPage, SetCurrentPage] = useState(1);
  const [isPageEnd, SetIsPageEnd] = useState(false);

  const type = "character";
  const apiPath = `https://rickandmortyapi.com/api/${type}?page=${currentPage}`;

  const onSearchChange: OnSearchChangeType = (event) => {
    SetSearchInput((preInut) => {
      return {
        ...preInut,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onCleanFilter = () => {
    SetSearchInput((preInput) => {
      return {
        ...preInput,
        status: "",
        gender: "",
      };
    });
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    SetIsBottom(scrollHeight - scrollTop === clientHeight);
  };

  //  fetch data
  useEffect(() => {
    if (
      !isBottom ||
      searchInput.name ||
      searchInput.status ||
      searchInput.gender ||
      isPageEnd
    )
      return;

    const fetchContactList = async () => {
      let result = [] as any[];
      let nextPage = currentPage;
      let isEnd = false;

      try {
        SetIsloading(true);

        const response = await fetch(apiPath);
        const data = await response.json();

        if (
          response.status < 400 &&
          response.ok &&
          data.hasOwnProperty("results") &&
          data.hasOwnProperty("info")
        ) {
          result = data.results;
          isEnd = data.info.pages === nextPage;

          if (isEnd) return;

          nextPage += 1;
        }
      } catch (e) {
        alert("something error...");

        console.log(e);
      } finally {
        SetContactList((preList) => [...preList, ...result]);
        contactListRef.current = [...contactList, ...result];

        SetIsloading(false);
        SetIsBottom(false);

        SetCurrentPage(nextPage);
        SetIsPageEnd(isEnd);
      }
    };

    //  call api
    fetchContactList();
  }, [isBottom]);

  //  Change contact list in every search
  useEffect(() => {
    if (!contactListRef.current || contactListRef.current.length === 0) return;

    const getFormatedObject = (object: SearchInputType) => {
      const formatString = (value: string) => {
        return value.toLowerCase().replaceAll(" ", "");
      };

      let instance = { ...object };

      for (const prop in instance) {
        instance = {
          ...instance,
          [prop]: formatString(instance[prop]),
        };
      }

      return instance;
    };

    const contactListInstance = [...contactListRef.current];

    //  format search input object
    const {
      name: sName,
      status: sStatus,
      gender: sGender,
    } = getFormatedObject(searchInput);

    const filteredContactList = contactListInstance.filter(
      ({ name, status, gender }) => {
        //  format data instance object
        const {
          name: oName,
          status: oStatus,
          gender: oGender,
        } = getFormatedObject({ name, status, gender });

        return (
          oName.includes(sName) &&
          oStatus.includes(sStatus) &&
          oGender.includes(sGender)
        );
      }
    );

    SetContactList(filteredContactList);
  }, [searchInput]);

  return (
    <div
      className="component-contact-list w-full bg-sky-500 overflow-auto"
      onScroll={handleScroll}
    >
      <div className="px-6 pt-6">
        <h1 className="mb-4 font-bold text-xl">Contact</h1>

        <input
          type="text"
          className="p-1 mb-5 rounded-md w-full text-sky-500"
          placeholder="Saerch Characters"
          value={searchInput.name}
          onChange={onSearchChange}
          name="name"
        />
        <SelectItem
          name="status"
          onSearchChange={onSearchChange}
          value={searchInput.status}
          options={["Alive", "Dead", "Unknown"]}
        />
        <SelectItem
          name="gender"
          onSearchChange={onSearchChange}
          value={searchInput.gender}
          options={["Male", "Female", "Genderless", "Unknown"]}
        />

        {(searchInput.status || searchInput.gender) && (
          <button
            className="p-1 mb-3 rounded-lg bg-red-500"
            onClick={onCleanFilter}
          >
            Clean Filter
          </button>
        )}
      </div>

      {contactList && contactList.length !== 0 && (
        <div className="grid gap-7 p-5">
          {contactList.map((contact, index) => {
            return (
              <React.Fragment key={index}>
                <ContactItem contact={contact} type="link" />
              </React.Fragment>
            );
          })}
        </div>
      )}

      {isLoading && <Loading />}
    </div>
  );
};
