"use client";
import React from "react";
import styles from "./Admin.Birth.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import not from "../Others/showNotification";
import axios from "axios";
import { useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';



const AdminBirthForms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingbtn, setIsLoadingbtn] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    var token = localStorage.getItem("admintoken");
    if (token == null) {
      router.push("/admin");
    }
    getBirthForms();
  }, []);

  var getBirthForms = async () => {
    try {
      setIsLoading(true);

      const data = await axios.get("http://localhost/birth/getAllBirth");

      console.log(data.data.allCertificates);

      setData(data.data.allCertificates);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      not(`${err.response.data["error"]}`, "error", 5000);
    }
  };

  const acceptForm = async (id) => {
    try {
      setIsLoadingbtn(true);

      await axios.put(`http://localhost/birth/acceptCer/${id}`);

      setIsLoading(true);

      getBirthForms();
      setIsLoading(false);

      setIsLoadingbtn(false);
    } catch (error) {
      setIsLoadingbtn(false);
      console.log(error);
      not(`${error}`, "error", 5000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainHead}>All Birthforms </div>

      <Link href="/admin/deathforms" className={styles.link}>
        {" "}
        See All Death Certificates{" "}
      </Link>
      <div className={styles.mainDiv}>

        <Table className={styles.table}>
          <Thead>
            <Tr>
              <Th className={styles.th}>FullName</Th>
              <Th className={styles.th}>Father&apos;s Name</Th>
              <Th className={styles.th}>Father&apos;s CNIC</Th>
              <Th className={styles.th}>Mother&apos;s Name</Th>
              <Th className={styles.th}>Mother&apos;s CNIC</Th>
              <Th className={styles.th}>Sex</Th>
              <Th className={styles.th}>Date of Birth</Th>
              <Th className={styles.th}>Place of Birth</Th>
              <Th className={styles.th}>Town</Th>
              <Th className={styles.th}>Transcation</Th>
              <Th className={styles.th}>Is Accepted</Th>

            </Tr>
          </Thead>

          {isLoading ? (
            <div className={styles.mainHead}> Loading ... </div>
          ) : (
            data.map((e) => {
              if(e["transactionId"] == null){
                e["transactionId"] = "null"
              }

              var date = new Date(e["DOB"]);
              var stDate = date.getDate() + " / " + date.getMonth() +" / "+date.getFullYear();
              return (

                  <Tbody  key={e["_id"]}>
                    <Tr>
                      <Td className={styles.field}>{e["fullName"]}</Td>
                      <Td className={styles.field}>{e["fatherFullName"]}</Td>
                      <Td className={styles.field}>{e["fatherCNIC"]}</Td>
                      <Td className={styles.field}>{e["motherFullName"]}</Td>
                      <Td className={styles.field}>{e["motherCNIC"]}</Td>
                      <Td className={styles.field}>{e["sex"]}</Td>
                      <Td className={styles.field}>{stDate.toString()}</Td>
                      <Td className={styles.field}>{e["placeOfBirth"]}</Td>
                      <Td className={styles.field}>{e["town"]}</Td>
                      <Td className={styles.field}>{e["transactionId"]}</Td>
                      <Td className={styles.field}>
                        {" "}
                        {e["isAccepted"] ? (
                          <div className={styles.accept}> Accepted </div>
                        ) : (
                          <button
                            className={
                              isLoadingbtn ? styles.buttonDead : styles.button
                            }
                            onClick={
                              isLoadingbtn ? null : () => acceptForm(e["_id"])
                            }
                          >
                            {isLoadingbtn ? "Loading.." : "Accept Request"}
                          </button>
                        )}

                      </Td>
                    </Tr>

                    {/* Add more rows as needed */}
                  </Tbody>


              );
            })
          )}

        </Table>




      </div>
    </div>
  );
};

export default AdminBirthForms;
