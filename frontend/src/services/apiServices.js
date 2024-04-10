import { useState, useEffect } from "react";
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const apiService = axios.create({
    baseURL: apiUrl,
});

export function isEmpty(obj) { 
    return Object.keys(obj).length === 0; 
} 

export const getBankList = async () => {
    try {
        const response = await apiService.get('/banks');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export async function getTransactionsList(accounts_id) {
    try {
        const response = (await apiService.get('/transactions?filter[where][accounts_id]='+accounts_id));
        return response.data;
    } catch (error) {
        throw error;
    }
};

export async function getPixKey(pixKey) {
    try {
        const response = (await apiService.get('/pixkeys?filter[where][key]='+pixKey));
        // console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export async function getAccount(accounts_id) {
    try {
        const response = (await apiService.get('/accounts?filter[where][id]='+ accounts_id));
        // console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};