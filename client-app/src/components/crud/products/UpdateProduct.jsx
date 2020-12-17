import React from 'react';
import { useParams } from "react-router-dom";

export const UpdateProduct = () => {

    const { id } = useParams();

    return (
        <h1>{id}</h1>
    )
}