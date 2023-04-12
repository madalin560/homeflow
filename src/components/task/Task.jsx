import React from "react";
import { PencilSquare, Trash} from 'react-bootstrap-icons';

import "./Task.scss";
import { Button } from "react-bootstrap";


function Task(props) {

    return (
        <div className="card">
            <b>{props.name}</b>
            <p className="faded">{props.assigneeName}</p>
            <div className="floatRight">
                <Button onClick={props.editAction}><PencilSquare/></Button>
                <Button onClick={props.deleteAction}><Trash/></Button>
            </div>
        </div>
        );
    }

export { Task }