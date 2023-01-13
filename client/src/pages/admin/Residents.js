import { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import AddResident from "../../components/admin/residents/AddResident";
import UpdateResident from "../../components/admin/residents/UpdateResident";
import DeleteResident from "../../components/admin/residents/DeleteResident";

function Residents() {
  const [allResidents, setAllResidents] = useState([]);
  const [toggleRerender, setToggleRerender] = useState(false);
  const [contextmenuIsShown, setContextmenuIsShown] = useState(false);
  const [clickedResidentInfo, setClickedResidentInfo] = useState({ id: "", coor: { x: 0, y: 0 }, residentObj: {} });
  const [updateFormOrDeleteFormIsShown, setUpdateFormOrDeleteFormIsShown] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    fetch("/admin/resident")
      .then((res) => res.json())
      .then((data) => {
        setAllResidents(data);
      });
  }, [toggleRerender]);

  useEffect(() => {
    window.addEventListener("click", () => {
      setContextmenuIsShown(false);
    });
  }, []);

  function handleSorting(e) {
    switch (e.currentTarget.parentElement.textContent) {
      case "First Name":
        setAllResidents((prevAllResidents) => [...prevAllResidents.sort((a, b) => a.firstName.localeCompare(b.firstName))]);
        break;
      case "Last Name":
        setAllResidents((prevAllResidents) => [...prevAllResidents.sort((a, b) => a.lastName.localeCompare(b.lastName))]);
        break;
      case "Unit":
        setAllResidents((prevAllResidents) => [...prevAllResidents.sort((a, b) => a.unit - b.unit)]);
        break;
      default:
        return;
    }
  }

  function handleContextmenu(e) {
    e.preventDefault();
    setClickedResidentInfo({ ...clickedResidentInfo, id: e.currentTarget.id, coor: { x: e.clientX, y: e.clientY } });
    setContextmenuIsShown(true);
  }

  function handleContextmenuClick(e) {
    if (e.target.textContent === "Update") {
      setUpdateFormOrDeleteFormIsShown("Update");
    } else if (e.target.textContent === "Delete") {
      setUpdateFormOrDeleteFormIsShown("Delete");
    }
    setClickedResidentInfo({ ...clickedResidentInfo, residentObj: allResidents.filter((resident) => resident._id === clickedResidentInfo.id)[0] });
    setResponseMessage("");
  }

  function handleContextmenuClose() {
    setUpdateFormOrDeleteFormIsShown("");
  }

  function handleUpdateFormChange(e) {
    setClickedResidentInfo({ ...clickedResidentInfo, residentObj: { ...clickedResidentInfo.residentObj, [e.target.name]: e.target.value } });
  }

  function handleUpdateSubmit(e) {
    e.preventDefault();
    fetch(`/admin/resident/${clickedResidentInfo.id}`, { method: "PUT", body: JSON.stringify(clickedResidentInfo.residentObj), headers: { "Content-Type": "application/json" } })
      .then((res) => res.text())
      .then((data) => {
        setResponseMessage(data);
        setToggleRerender((prevToggleRerender) => !prevToggleRerender);
      });
  }

  function handleDeleteClick() {
    fetch(`/admin/resident/${clickedResidentInfo.id}`, { method: "DELETE" })
      .then((res) => res.text())
      .then((data) => {
        setResponseMessage(data);
        setToggleRerender((prevToggleRerender) => !prevToggleRerender);
      });
  }

  return (
    <>
      <main className="p-5 bg-gray-100">
        <h1 className="text-xl font-semibold">Residents</h1>
        <div className="bg-white w-full rounded border-2">
          <table className="w-full">
            <thead>
              <tr className="text-left ">
                <th className="py-2">
                  First Name
                  <ArrowsUpDownIcon className="h-5 w-5 inline cursor-pointer p-0.5 ml-1 text-gray-600 rounded hover:bg-gray-200" onClick={handleSorting} />
                </th>
                <th className="py-2">
                  Last Name
                  <ArrowsUpDownIcon className="h-5 w-5 inline cursor-pointer p-0.5 ml-1 text-gray-600 rounded hover:bg-gray-200" onClick={handleSorting} />
                </th>
                <th className="py-2">
                  Unit
                  <ArrowsUpDownIcon className="h-5 w-5 inline cursor-pointer p-0.5 ml-1 text-gray-600 rounded hover:bg-gray-200" onClick={handleSorting} />
                </th>
              </tr>
            </thead>
            <tbody>
              {allResidents.map((resident) => (
                <tr key={resident._id} id={resident._id} className="odd:bg-gray-200 even:bg-gray-50 first:border-t border-gray-400 hover:bg-slate-300 cursor-pointer" onContextMenu={handleContextmenu}>
                  <td>{resident.firstName}</td>
                  <td>{resident.lastName}</td>
                  <td>{resident.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <section className="grid grid-cols-2 gap-2">
          <AddResident setToggleRerender={setToggleRerender} />
          {updateFormOrDeleteFormIsShown === "Update" && <UpdateResident clickedResidentInfo={clickedResidentInfo} handleUpdateFormChange={handleUpdateFormChange} responseMessage={responseMessage} handleContextmenuClose={handleContextmenuClose} handleUpdateSubmit={handleUpdateSubmit} />}
          {updateFormOrDeleteFormIsShown === "Delete" && <DeleteResident clickedResidentInfo={clickedResidentInfo} responseMessage={responseMessage} handleContextmenuClose={handleContextmenuClose} handleDeleteClick={handleDeleteClick} />}
        </section>
        {contextmenuIsShown && <Contextmenu clickedResidentInfo={clickedResidentInfo} handleContextmenuClick={handleContextmenuClick} />}
      </main>
    </>
  );
}

function Contextmenu(props) {
  return (
    <aside className="bg-white border border-slate-500 rounded fixed" style={{ left: props.clickedResidentInfo.coor.x, top: props.clickedResidentInfo.coor.y }}>
      <button className="block rounded-t px-1 text-left w-full hover:bg-slate-300 hover:text-green-600" onClick={props.handleContextmenuClick}>
        Update
        <PencilSquareIcon className="h-5 w-5 inline ml-2 mb-1 text-green-600" />
      </button>
      <button className="block rounded-b px-1 text-left w-full hover:bg-slate-300 hover:text-red-600" onClick={props.handleContextmenuClick}>
        Delete
        <TrashIcon className="h-5 w-5 inline ml-2 mb-1 text-red-600" />
      </button>
    </aside>
  );
}

export default Residents;
