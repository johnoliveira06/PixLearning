import { useState, useEffect } from "react";
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const apiService = axios.create({
    baseURL: apiUrl,
});

export const getBankList = async () => {
    // const [data, setData] = useState([]);


    // async function getBanks() {
    //   try {
    //     const result = await getBankList();
    //     setData(result);
    //   } catch (error) {
    //     console.log('Error fetching data: ', error)
    //   }
    // }
  
    // useEffect(() => {
    //   getBanks();
    // }, []);


    try {
        const response = await apiService.get('/banks');
        return response.data;
        // setData(response);
        // return data;
    } catch (error) {
        throw error;
    }
};

export async function getTransactionsList(accounts_id) {
    try {
        const response = await apiService.get('/transactions?filter[where][accounts_id]='+accounts_id);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};