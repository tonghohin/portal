import { XMarkIcon } from "@heroicons/react/24/solid";

function UpdateResident(props) {
  if (props.responseMessage) {
    return <p className="text-cyan-600 p-2 text-md bg-white mt-2 border-2 border-cyan-600 rounded">{props.responseMessage}</p>;
  } else {
    return (
      <form className="p-2 text-md bg-white mt-2 border-2 border-cyan-600 rounded relative" onSubmit={props.handleUpdateSubmit}>
        <XMarkIcon className="cursor-pointer h-5 w-5 text-slate-600 absolute right-0 top-0 hover:bg-slate-300 transition" onClick={props.handleContextmenuClose} />
        <h2 className="font-semibold">Update a resident</h2>
        <input className="bg-gray-100 m-1 ml-0 border-2 w-full" type="text" name="firstName" placeholder="First Name" onChange={props.handleUpdateFormChange} value={props.clickedResidentInfo.residentObj.firstName} required={true} autoComplete="false"></input>
        <input className="bg-gray-100 m-1 ml-0 border-2 w-full" type="text" name="lastName" placeholder="Last Name" onChange={props.handleUpdateFormChange} value={props.clickedResidentInfo.residentObj.lastName} required={true} autoComplete="false"></input>
        <input className="bg-gray-100 m-1 ml-0 border-2 w-full" type="text" name="unit" placeholder="Unit" onChange={props.handleUpdateFormChange} value={props.clickedResidentInfo.residentObj.unit} required={true} autoComplete="false"></input>
        <button className="block bg-cyan-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-700 transition">Update</button>
      </form>
    );
  }
}

export default UpdateResident;
