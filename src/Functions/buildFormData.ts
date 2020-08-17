import {ITicketForm} from "../Models/ticketForm";

let formBuilder = (obj : ITicketForm) : FormData => {

    let formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value);
    });

    return formData;
}

export default formBuilder;