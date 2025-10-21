'use client'
import fetcher from "@/app/lib/fetcher";
import { Skeleton, Table } from "antd";
import useSWR from "swr";

const CustomersPage = () => {
   const{data , error , isLoading} =  useSWR('/customer' , fetcher)
   console.log(data , error)

   if(isLoading)
    return <Skeleton/>

   const column = [
        {
            key : 'fullname',
            title : 'Fullname',
            dataIndex : 'fullname'
        },
        {
            key : 'email',
            title : 'Email',
            dataIndex : 'email'
        },
        {
            key : 'mobile',
            title : 'Mobile',
            dataIndex : 'mobile'
        }
   ]
  return (
    <>
      <div>
        <Table
            columns={column}
            dataSource={data}
            rowKey="_id"
        />
      </div>
    </>
  );
};

export default CustomersPage;
