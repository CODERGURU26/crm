'use client'
import fetcher from "@/app/lib/fetcher";
import useSWR from "swr";

const CustomersPage = () => {
   const{data , error} =  useSWR('/customer' , fetcher)
   console.log(data , error)
  return (
    <>
      <h1>👥 Customers</h1>
      <p>Manage your customer data here.</p>
    </>
  );
};

export default CustomersPage;
