import {ITicketForm} from "../Models/ticketForm";
import { ICommentForm } from "../Models/commentForm";

let formBuilder = (obj : ITicketForm | ICommentForm) : FormData => {

    let formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value);
    });

    return formData;
}

export default formBuilder;