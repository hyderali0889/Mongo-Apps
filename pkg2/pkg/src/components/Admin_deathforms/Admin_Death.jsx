"use client";
import React from "react";
import styles from "./Admin.Death.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import not from "../Others/showNotification";
import axios from "axios";
import { useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


const AdminDeathForms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingbtn, setIsLoadingbtn] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();

  var getDeathForms = async () => {
    try {
      setIsLoading(true);

      const data = await axios.get("http://localhost/death/getAllDeath");

      console.log(data.data.death[0]["_id"]);

      setData(data.data.death);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      not(`${error}`, "error", 5000);
    }
  };

  const acceptForm = async (id) => {
    try {
      setIsLoadingbtn(true);

      await axios.put(`http://localhost/death/acceptCer/${id}`);

      setIsLoading(true);

      getDeathForms();
      setIsLoading(false);

      setIsLoadingbtn(false);
    } catch (err) {
      setIsLoadingbtn(false);

      not(`${err.response.data["error"]}`, "error", 5000);
    }
  };

  useEffect(() => {
    var token = localStorage.getItem("admintoken");
    if (token == null) {
      router.push("/admin");
    }
    getDeathForms();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.mainHead}>All DeathForms</div>
      <Link href="/admin/birthforms" className={styles.links}>
        {" "}
        See All Birth Certificates{" "}
      </Link>
      <div className={styles.mainDiv}>

                <Table  className={styles.tbl}>
                  <Thead >
                    <Tr>
                      <Th className={styles.th}>FullName</Th>

                      <Th className={styles.th}>NextofKin&apos;sFullName</Th>
                      <Th className={styles.th}>Nextofkin&apos;sCNIC</Th>
                      <Th className={styles.th}>Death&apos;s CNIC</Th>
                      <Th className={styles.th}>Sex</Th>
                      <Th className={styles.th}>Date of Death</Th>
                      <Th className={styles.th}>Place of death</Th>
                      <Th className={styles.th}>town</Th>
                      <Th className={styles.th}>Cause of Death</Th>
                      <Th className={styles.th}>Transcation Id</Th>
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

            var date = new Date(e["DOD"]);
            var stDate = date.getDate() + "/" + date.getMonth() +"/"+date.getFullYear();
            return (


                  <Tbody key={e["id"]} >
                    <Tr>
                      <Td className={styles.field}>{e["fullName"]}</Td>

                      <Td className={styles.field}>{e["nextOfKinFullName"]}</Td>
                      <Td className={styles.field}>{e["nextOfkinCNIC"]}</Td>
                      <Td className={styles.field}>{e["DeathCNIC"]}</Td>
                      <Td className={styles.field}>{e["sex"]}</Td>
                      <Td className={styles.field}>{stDate.toString()}</Td>
                      <Td className={styles.field}>{e["placeOfDeath"]}</Td>
                      <Td className={styles.field}>{e["town"]}</Td>
                      <Td className={styles.field}>{e["causeOfDeath"]}</Td>
                      <Td className={styles.field}>{e["transactionId"]}</Td>


                      <Td className={styles.field}>
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
                  </Tbody>

            );
          })
        )}
                </Table>

      </div>
    </div>
  );
};

export default AdminDeathForms;
